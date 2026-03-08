// Interface defining the structure of a Material
export interface Material {
    id: string;
    title: string;
    grade: string;
    subject: string;
    unit: string;
    problem_pdf_path: string;
    answer_pdf_path?: string;
    created_at?: string;
}

/**
 * Reads all materials from API
 */
export async function getMaterials(): Promise<Material[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/materials`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            console.error('Failed to fetch materials:', res.statusText);
            return [];
        }
        return await res.json() as Material[];
    } catch (e) {
        console.error('Error fetching materials:', e);
        return [];
    }
}

