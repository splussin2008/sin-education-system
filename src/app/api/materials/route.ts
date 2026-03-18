import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// GET handler to fetch all materials (with optional filtering)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const grade = searchParams.get('grade');
        const subject = searchParams.get('subject');
        const unit = searchParams.get('unit');
        const level = searchParams.get('level');

        // Build where clause
        const whereClause: any = {};
        if (grade) whereClause.grade = grade;
        if (subject) whereClause.subject = subject;
        if (unit) whereClause.unit = unit;
        if (level) whereClause.level = level;

        const materials = await prisma.material.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });

        // Add proper paths and ensure compatibility with frontend
        const returnMaterials = materials.map((m: any) => ({
            ...m,
            created_at: m.createdAt,
            problem_pdf_path: `/uploads/materials/${m.problem_pdf_path}`,
            answer_pdf_path: m.answer_pdf_path ? `/uploads/materials/${m.answer_pdf_path}` : undefined,
            pdfUrl: `/uploads/materials/${m.problem_pdf_path}`, // For compatibility with older UI parts
        }));

        return NextResponse.json(returnMaterials);
    } catch (error) {
        console.error("GET /api/materials error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST handler to upload a new material
export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const grade = formData.get('grade') as string;
        const subject = formData.get('subject') as string;
        const unit = formData.get('unit') as string;
        const level = formData.get('level') as string;
        const problemPdf = formData.get('problemPdf') as File | null;
        const answerPdf = formData.get('answerPdf') as File | null;

        if (!title || !grade || !subject || !unit || !level || !problemPdf) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'materials');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // Generate unique ID
        const newId = uuidv4();

        // Save Problem PDF to Local FS
        const probFilename = `problem_${newId}.pdf`;
        const problemPdfArrayBuffer = await problemPdf.arrayBuffer();
        const problemPdfBuffer = Buffer.from(problemPdfArrayBuffer);
        await fs.writeFile(path.join(uploadDir, probFilename), problemPdfBuffer);

        // Save Answer PDF if exists
        let ansFilename = null;
        if (answerPdf) {
            ansFilename = `answer_${newId}.pdf`;
            const answerPdfArrayBuffer = await answerPdf.arrayBuffer();
            const answerPdfBuffer = Buffer.from(answerPdfArrayBuffer);
            await fs.writeFile(path.join(uploadDir, ansFilename), answerPdfBuffer);
        }

        // Insert into Database
        const newMaterial = await prisma.material.create({
            data: {
                id: newId,
                title,
                grade,
                subject,
                unit,
                level,
                problem_pdf_path: probFilename,
                answer_pdf_path: ansFilename
            }
        });

        const returnMaterial = {
            ...newMaterial,
            created_at: newMaterial.createdAt,
            problem_pdf_path: `/uploads/materials/${newMaterial.problem_pdf_path}`,
            answer_pdf_path: newMaterial.answer_pdf_path ? `/uploads/materials/${newMaterial.answer_pdf_path}` : undefined,
            pdfUrl: `/uploads/materials/${newMaterial.problem_pdf_path}`,
        }

        return NextResponse.json(returnMaterial, { status: 201 });
    } catch (error) {
        console.error("POST /api/materials error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE handler
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
        }

        // Fetch material to get file paths
        const material = await prisma.material.findUnique({
            where: { id }
        });

        if (!material) {
            return NextResponse.json({ error: 'Material not found' }, { status: 404 });
        }

        // Delete from DB
        await prisma.material.delete({
            where: { id }
        });

        // Delete files from storage
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'materials');

        try {
            await fs.unlink(path.join(uploadDir, material.problem_pdf_path));
        } catch (e) {
            console.error('Warning: Failed to delete problem PDF from local storage:', e);
        }

        if (material.answer_pdf_path) {
            try {
                await fs.unlink(path.join(uploadDir, material.answer_pdf_path));
            } catch (e) {
                console.error('Warning: Failed to delete answer PDF from local storage:', e);
            }
        }

        return NextResponse.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error("DELETE /api/materials error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
