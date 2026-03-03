'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Material } from '@/types/material';
import { mockMaterials } from '@/data/mockMaterials';

interface MaterialContextType {
    materials: Material[];
    addMaterial: (material: Material) => void;
    updateMaterial: (material: Material) => void;
    deleteMaterial: (id: string) => void;
}

const MaterialContext = createContext<MaterialContextType | undefined>(undefined);

export const MaterialProvider = ({ children }: { children: ReactNode }) => {
    const [materials, setMaterials] = useState<Material[]>(mockMaterials);

    // Initial load from Backend API
    const fetchMaterials = async () => {
        try {
            const res = await fetch('/api/materials');
            if (res.ok) {
                const data: Material[] = await res.json();
                setMaterials(data);
            }
        } catch (e) {
            console.error("Failed to fetch materials from API", e);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const addMaterial = async (material: Material) => {
        // Optimistically update UI
        setMaterials(prev => [...prev, material]);
        // Note: The actual API call for add is now typically handled via FormData upload in a form, 
        // passing File objects. So this context method might just be used to append to state 
        // *after* a successful upload, or we can refetch. For simplicity, we just fetch list again to ensure sync.
        await fetchMaterials();
    };

    const updateMaterial = (updatedMaterial: Material) => {
        // Optionally implement a PUT endpoint and call it here.
        setMaterials(prev => prev.map(m => m.id === updatedMaterial.id ? updatedMaterial : m));
    };

    const deleteMaterial = async (id: string) => {
        try {
            const res = await fetch(`/api/materials?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMaterials(prev => prev.filter(m => m.id !== id));
            } else {
                console.error("Failed to delete material");
            }
        } catch (e) {
            console.error("Error deleting material", e);
        }
    };

    return (
        <MaterialContext.Provider value={{ materials, addMaterial, updateMaterial, deleteMaterial }}>
            {children}
        </MaterialContext.Provider>
    );
};

export const useMaterials = () => {
    const context = useContext(MaterialContext);
    if (context === undefined) {
        throw new Error('useMaterials must be used within a MaterialProvider');
    }
    return context;
};
