'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Grade, Subject, Level, Material } from '@/types/material';
import { unitMap } from '@/data/units';
import { useMaterials } from '@/context/MaterialContext';
import { GRADES, JHS_SUBJECTS, HS_SUBJECTS, LEVELS } from '@/data/constants';


export default function Home() {
  const { materials } = useMaterials();
  const [selectedGrade, setSelectedGrade] = useState<Grade | ''>('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | ''>('');
  const [selectedLevel, setSelectedLevel] = useState<Level | ''>('');
  const [unitSearch, setUnitSearch] = useState('');

  // Selection state for merging PDFs
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<Set<string>>(new Set());
  const [isDownloading, setIsDownloading] = useState(false);

  const availableSubjects = useMemo(() => {
    if (!selectedGrade) {
      return Array.from(new Set([...JHS_SUBJECTS, ...HS_SUBJECTS]));
    }
    // 中学枠：「中」から始まるか、高校受験
    if (selectedGrade.startsWith('中') || selectedGrade === '高校受験') {
      return JHS_SUBJECTS;
    }
    // 高校枠：「高」から始まるか、大学受験
    return HS_SUBJECTS;
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      if (!availableSubjects.includes(selectedSubject)) {
        setSelectedSubject('');
        setUnitSearch('');
      }
    }
  }, [selectedGrade, availableSubjects, selectedSubject]);

  const availableUnits = useMemo(() => {
    if (!selectedSubject) return [];

    // 中学・高校受験の場合は「学年_科目」のキーで検索
    if (selectedGrade && (selectedGrade.startsWith('中') || selectedGrade === '高校受験')) {
      const jhsKey = `${selectedGrade}_${selectedSubject}`;
      if (unitMap[jhsKey]) {
        return unitMap[jhsKey];
      }
    }

    // 高校生、またはキーが見つからなかった場合は科目単体でフォールバック
    return unitMap[selectedSubject] || [];
  }, [selectedGrade, selectedSubject]);

  useEffect(() => {
    if (selectedSubject && unitSearch) {
      if (!availableUnits.includes(unitSearch)) {
        setUnitSearch('');
      }
    } else if (!selectedSubject) {
      setUnitSearch('');
    }
  }, [selectedSubject, availableUnits, unitSearch]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchGrade = !selectedGrade || m.grade === selectedGrade;
      const matchSubject = !selectedSubject || m.subject === selectedSubject;
      const matchLevel = !selectedLevel || m.level === selectedLevel;
      const matchUnit = !unitSearch || m.unit.includes(unitSearch) || m.title.includes(unitSearch);
      return matchGrade && matchSubject && matchLevel && matchUnit;
    });
  }, [selectedGrade, selectedSubject, selectedLevel, unitSearch, materials]);

  const toggleSelection = (id: string) => {
    setSelectedMaterialIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDownloadMergedPdf = async (type: 'problem' | 'answer') => {
    if (selectedMaterialIds.size === 0) {
      alert('出力するプリントを選択してください。');
      return;
    }

    setIsDownloading(true);
    try {
      const materialIdsArray = Array.from(selectedMaterialIds);
      const res = await fetch(`/api/pdf/merge/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ materialIds: materialIdsArray })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to merge PDF');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'problem' ? 'problems.pdf' : 'answers.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e: any) {
      console.error(e);
      alert(`PDFの作成に失敗しました: ${e.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-10 text-center">
        <h1 className="text-xl font-bold tracking-wider">学習塾Sin° 教材システム</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {/* Search Filters */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">検索条件</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grade */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">学年</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50 text-slate-800"
              >
                <option value="">すべて</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">科目</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as Subject)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50 text-slate-800"
              >
                <option value="">すべて</option>
                {availableSubjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Unit Search */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">単元・分野 {!selectedSubject && <span className="text-xs text-red-400">※先に科目を選択してください</span>}</label>
              <select
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                disabled={!selectedSubject}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50 text-slate-800 disabled:opacity-50 disabled:bg-slate-100"
              >
                <option value="">すべて</option>
                {availableUnits.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">レベル</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLevel('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedLevel ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  すべて
                </button>
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(l)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLevel === l ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results List */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-semibold text-slate-800">教材一覧 ({filteredMaterials.length}件)</h2>
            <Link
              href="/admin/materials/new"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>問題を作成</span>
            </Link>
          </div>

          <div className="space-y-4">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <div key={material.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group flex gap-4 items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={selectedMaterialIds.has(material.id)}
                    onChange={() => toggleSelection(material.id)}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">{material.grade}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">{material.subject}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">{material.level}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">
                        <Link href={`/materials/${material.id}`} className="hover:text-blue-600 transition-colors">
                          {material.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">単元: {material.unit}</p>
                      {/* Use problem_pdf_path or pdfUrl */}
                      {(material.problem_pdf_path || material.pdfUrl) && (
                        <div className="flex flex-wrap gap-2">
                          <a href={material.problem_pdf_path || material.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            問題PDFを開く
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <button
                        onClick={() => toggleSelection(material.id)}
                        className={`flex-1 sm:w-32 h-10 ${selectedMaterialIds.has(material.id) ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'} rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 text-sm`}
                      >
                        {selectedMaterialIds.has(material.id) ? '選択解除' : '+ 選択する'}
                      </button>

                      <button
                        onClick={async () => {
                          if (window.confirm(`「${material.title}」と関連するPDFを完全に削除します。よろしいですか？`)) {
                            // Call delete API
                            try {
                              const res = await fetch(`/api/materials?id=${material.id}`, { method: 'DELETE' });
                              if (res.ok) {
                                // Refresh materials list via context
                                window.location.reload();
                              } else {
                                alert('削除に失敗しました。');
                              }
                            } catch (e) {
                              console.error(e);
                              alert('エラーが発生しました。');
                            }
                          }
                        }}
                        className="flex-1 sm:w-32 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 text-sm"
                      >
                        削除する
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400">該当する教材が見つかりませんでした。</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Panel */}
      {selectedMaterialIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-800 font-bold">
              <span className="text-2xl text-blue-600">{selectedMaterialIds.size}</span>
              <span className="text-sm ml-1 text-slate-500">件のプリントを選択中</span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleDownloadMergedPdf('problem')}
                disabled={isDownloading}
                className="flex-1 sm:px-6 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isDownloading ? '作成中...' : '問題編PDFを出力'}
              </button>
              <button
                onClick={() => handleDownloadMergedPdf('answer')}
                disabled={isDownloading}
                className="flex-1 sm:px-6 h-12 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isDownloading ? '作成中...' : '解答編PDFを出力'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
