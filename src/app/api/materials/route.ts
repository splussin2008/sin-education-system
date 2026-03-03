import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Material, getMaterials } from '@/lib/materials';
import { supabase } from '@/lib/supabase';

// GET handler to fetch all materials (with optional filtering)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const grade = searchParams.get('grade');
        const subject = searchParams.get('subject');
        const unit = searchParams.get('unit');

        let materials = await getMaterials();

        // Apply filters if provided
        if (grade) materials = materials.filter(m => m.grade === grade);
        if (subject) materials = materials.filter(m => m.subject === subject);
        if (unit) materials = materials.filter(m => m.unit === unit);

        return NextResponse.json(materials);
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
        const problemPdf = formData.get('problemPdf') as File | null;
        const answerPdf = formData.get('answerPdf') as File | null;

        if (!title || !grade || !subject || !unit || !problemPdf) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate unique ID
        const newId = uuidv4();

        // Save Problem PDF to Supabase Storage
        const probFilename = `problem_${newId}.pdf`;
        const { error: probUploadError } = await supabase.storage
            .from('materials')
            .upload(probFilename, problemPdf, {
                contentType: 'application/pdf',
                upsert: true
            });

        if (probUploadError) {
            console.error('Error uploading problem PDF:', probUploadError);
            return NextResponse.json({ error: 'Failed to upload problem PDF' }, { status: 500 });
        }

        // Save Answer PDF if exists
        let ansFilename = null;
        if (answerPdf) {
            ansFilename = `answer_${newId}.pdf`;
            const { error: ansUploadError } = await supabase.storage
                .from('materials')
                .upload(ansFilename, answerPdf, {
                    contentType: 'application/pdf',
                    upsert: true
                });
            if (ansUploadError) {
                console.error('Error uploading answer PDF:', ansUploadError);
                return NextResponse.json({ error: 'Failed to upload answer PDF' }, { status: 500 });
            }
        }

        // Insert into Database
        const { data: newMaterial, error: dbError } = await supabase
            .from('materials')
            .insert([{
                id: newId,
                title,
                grade,
                subject,
                unit,
                problem_pdf_path: probFilename,
                answer_pdf_path: ansFilename
            }])
            .select()
            .single();

        if (dbError) {
            console.error('Error saving to database:', dbError);
            return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
        }

        return NextResponse.json(newMaterial, { status: 201 });
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
        const { data: material, error: fetchError } = await supabase
            .from('materials')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !material) {
            return NextResponse.json({ error: 'Material not found' }, { status: 404 });
        }

        // Delete from DB
        const { error: deleteError } = await supabase
            .from('materials')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Error deleting from database:', deleteError);
            return NextResponse.json({ error: 'Failed to delete from database' }, { status: 500 });
        }

        // Delete files from storage
        const filesToRemove = [material.problem_pdf_path];
        if (material.answer_pdf_path) {
            filesToRemove.push(material.answer_pdf_path);
        }

        const { error: storageError } = await supabase.storage
            .from('materials')
            .remove(filesToRemove);

        if (storageError) {
            console.error('Warning: Failed to delete files from storage:', storageError);
        }

        return NextResponse.json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error("DELETE /api/materials error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
