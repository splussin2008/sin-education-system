import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { getMaterials, Material } from '@/lib/materials';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { materialIds } = await request.json();

        if (!Array.isArray(materialIds) || materialIds.length === 0) {
            return NextResponse.json({ error: 'No material IDs provided' }, { status: 400 });
        }

        const materials = await getMaterials();
        const selectedMaterials = materials.filter((m: Material) => materialIds.includes(m.id));

        if (selectedMaterials.length === 0) {
            return NextResponse.json({ error: 'Selected materials not found' }, { status: 404 });
        }

        // Initialize a new PDFDocument
        const mergedPdf = await PDFDocument.create();

        for (const material of selectedMaterials) {
            try {
                if (!material.problem_pdf_path) {
                    console.warn(`Problem PDF path not found for material ID: ${material.id}`);
                    continue;
                }
                const { data, error } = await supabase.storage
                    .from('materials')
                    .download(material.problem_pdf_path);

                if (error || !data) {
                    console.error(`Failed to download PDF from storage for material ${material.id}:`, error);
                    continue;
                }

                const pdfBytes = await data.arrayBuffer();
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
