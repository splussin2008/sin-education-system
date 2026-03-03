import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function createDummyPdfs() {
    const createPdf = async (text: string, filename: string) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
        page.drawText(text, {
            x: 50,
            y: 800,
            size: 24,
            color: rgb(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(filename, pdfBytes);
        console.log(`Created ${filename}`);
    };

    await createPdf('This is a dummy Problem PDF 1', 'dummy_problem_1.pdf');
    await createPdf('This is a dummy Answer PDF 1', 'dummy_answer_1.pdf');
    await createPdf('This is a dummy Problem PDF 2', 'dummy_problem_2.pdf');
}

createDummyPdfs().catch(console.error);
