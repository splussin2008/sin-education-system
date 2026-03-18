'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMaterials } from '@/context/MaterialContext';
import { Grade, Subject, Level, Material } from '@/types/material';
import { unitMap } from '@/data/units';
import { GRADES, JHS_SUBJECTS, HS_SUBJECTS, LEVELS } from '@/data/constants';


export default function NewMaterialPage() {
    const router = useRouter();
    const { addMaterial } = useMaterials();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Basic Info State
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState<Grade | ''>('');
    const [subject, setSubject] = useState<Subject | ''>('');
    const [unit, setUnit] = useState('');
    const [level, setLevel] = useState<Level | ''>('標準');

    // PDF State
    const [problemPdf, setProblemPdf] = useState<File | null>(null);
    const [answerPdf, setAnswerPdf] = useState<File | null>(null);

    const availableSubjects = useMemo(() => {
        if (!grade) {
            return Array.from(new Set([...JHS_SUBJECTS, ...HS_SUBJECTS]));
        }
        if (grade.startsWith('中') || grade === '高校受験') {
            return JHS_SUBJECTS;
        }
        return HS_SUBJECTS;
    }, [grade]);

    const availableUnits = useMemo(() => {
        if (!subject) return [];
        if (grade && (grade.startsWith('中') || grade === '高校受験')) {
            const jhsKey = `${grade}_${subject}`;
            if (unitMap[jhsKey]) {
                return unitMap[jhsKey];
            }
        }
        return unitMap[subject] || [];
    }, [grade, subject]);

    const handleProblemFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setProblemPdf(file);
        } else if (file) {
            alert('問題編はPDFファイルを選択してください。');
        }
    };

    const handleAnswerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setAnswerPdf(file);
        } else if (file) {
            alert('解答編はPDFファイルを選択してください。');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !grade || !subject || !unit || !level) {
            alert('基本情報をすべて入力してください。');
            return;
        }
        if (!problemPdf) {
            alert('問題編のPDFファイルをアップロードしてください。');
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('grade', grade);
            formData.append('subject', subject);
            formData.append('unit', unit);
            formData.append('level', level);
            formData.append('problemPdf', problemPdf);

            if (answerPdf) {
                formData.append('answerPdf', answerPdf);
            }

            const res = await fetch('/api/materials', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to upload material');
            }

            const savedMaterial = await res.json();

            // Re-fetch context to get latest materials
            await addMaterial(savedMaterial);

            alert('教材を保存しました！');
            router.push(`/`); // 成功時はトップページ（一覧）へ戻す

        } catch (error: any) {
            console.error('Error uploading:', error);
            alert(`エラーが発生しました: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-200 pb-4">新規プリント作成（APIアップロード）</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 基本情報 */}
                <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">1. 基本情報</h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">プリントのタイトル *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="例: 1学期中間テスト対策 数学"
                            className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">学年 *</label>
                            <select value={grade} onChange={e => setGrade(e.target.value as Grade)} required className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white">
                                <option value="">選択</option>
                                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">科目 *</label>
                            <select value={subject} onChange={e => { setSubject(e.target.value as Subject); setUnit(''); }} required className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white">
                                <option value="">選択</option>
                                {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">単元 *</label>
                            <select value={unit} onChange={e => setUnit(e.target.value)} required disabled={!subject} className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white">
                                <option value="">選択</option>
                                {availableUnits.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">レベル *</label>
                            <select value={level} onChange={e => setLevel(e.target.value as Level)} required className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white">
                                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>
                </section>

                {/* PDFアップロード */}
                <section className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">2. 問題構成（PDFアップロード）</h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">問題編のPDFファイルを選択してください *</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleProblemFile}
                            required
                            className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100 transition-all cursor-pointer"
                        />
                        {problemPdf && <p className="text-sm mt-2 text-green-600">✓ {problemPdf.name} が選択されています</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">解答編のPDFファイルを選択してください（任意）</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleAnswerFile}
                            className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-slate-200 file:text-slate-700
                            hover:file:bg-slate-300 transition-all cursor-pointer"
                        />
                        {answerPdf && <p className="text-sm mt-2 text-green-600">✓ {answerPdf.name} が選択されています</p>}
                    </div>
                </section>

                <div className="pt-8 border-t border-slate-200">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full h-14 text-white font-bold rounded-xl text-lg shadow-lg transition-colors ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isSubmitting ? 'アップロード処理中...' : 'サーバーにアップロードして保存'}
                    </button>
                    <p className="text-xs text-slate-500 text-center mt-3">
                        ※ファイルはサーバーのローカルディレクトリに保存され、JSONで管理されます。
                    </p>
                </div>
            </form>
        </div>
    );
}
