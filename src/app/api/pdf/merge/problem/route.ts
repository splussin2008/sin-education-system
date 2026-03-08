import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { materialIds } = await request.json();

        if (!Array.isArray(materialIds) || materialIds.length === 0) {
            return NextResponse.json({ error: 'No material IDs provided' }, { status: 400 });
        }

        const selectedMaterials = await prisma.material.findMany({
            where: {
                id: { in: materialIds }
            }
        });

        if (selectedMaterials.length === 0) {
            return NextResponse.json({ error: 'Selected materials not found' }, { status: 404 });
        }

        // Initialize a new PDFDocument
        const mergedPdf = await PDFDocument.create();
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'materials');

        for (const material of selectedMaterials) {
            try {
                if (!material.problem_pdf_path) {
                    console.warn(`Problem PDF path not found for material ID: ${material.id}`);
                    continue;
                }

                const filePath = path.join(uploadDir, material.problem_pdf_path.replace('/uploads/materials/', ''));

                try {
                    await fs.access(filePath);
                } catch {
                    console.error(`Problem PDF file not found for material ${material.id}:`, filePath);
                    continue;
                }

                const pdfBytes = await fs.readFile(filePath);
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            } catch (err) {
                console.error(`Failed to load or merge PDF for material ${material.id}:`, err);
            }
        }

        // If no pages were added
        if (mergedPdf.getPageCount() === 0) {
            return NextResponse.json({ error: 'Could not generate PDF' }, { status: 500 });
        }

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await mergedPdf.save();

        // Return the PDF as a Response with appropriate headers
        return new NextResponse(Buffer.from(pdfBytes), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="problems.pdf"',
            },
        });

    } catch (error) {
        console.error('POST /api/pdf/merge/problem error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
