import { supabase } from '@/lib/supabase';

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
 * Reads all materials from Supabase
 */
export async function getMaterials(): Promise<Material[]> {
    const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error reading materials:', error);
        return [];
    }
    return data as Material[];
}

