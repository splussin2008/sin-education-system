'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useMaterials } from '@/context/MaterialContext';

export default function MaterialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const { materials } = useMaterials();
    const material = materials.find(m => m.id === id);

    if (!material) {
        notFound();
    }

    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-xl min-h-[297mm] p-12 print:shadow-none print:w-auto print:h-auto print:min-h-0 print:p-0 relative font-serif text-slate-800">
            {/* 印刷除外のコントロールパネル */}
            <div className="absolute top-4 right-4 print:hidden flex gap-2">
                <button
                    onClick={() => window.print()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    印刷する
                </button>
                <button
                    onClick={() => window.close()}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold shadow-md transition-colors"
                >
                    閉じる
                </button>
            </div>

            {/* ヘッダー部分 */}
            <div className="border-b-2 border-slate-800 pb-2 mb-8 flex justify-between items-end">
                <div>
                    <span className="text-sm font-bold border border-slate-800 px-2 py-0.5 rounded-sm mr-2">{material.grade} {material.subject}</span>
                    <span className="text-sm font-bold border border-slate-800 px-2 py-0.5 rounded-sm mr-2">{material.level}</span>
                    <span className="text-sm text-slate-600">単元: {material.unit}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-end gap-1">
                        <span>年</span><span className="inline-block w-8 border-b border-slate-400"></span>
                        <span>月</span><span className="inline-block w-8 border-b border-slate-400"></span>
                        <span>日</span>
                    </div>
                    <div className="flex items-end gap-1">
                        <span>氏名</span><span className="inline-block w-32 border-b border-slate-400"></span>
                    </div>
                    <div className="flex items-center border border-slate-800 px-2 py-1">
                        得点 <span className="inline-block w-12 text-center border-b border-slate-400 mx-1"></span> / 100
                    </div>
                </div>
            </div>

            {/* タイトル */}
            <h1 className="text-2xl font-bold text-center mb-10 tracking-widest">{material.title}</h1>

            {/* 問題本文 (動的レンダリング or PDF) */}
            <div className="space-y-12">
                {material.pdfUrl && material.pdfUrl !== '#' ? (
                    <div className="w-full h-[800px] border border-slate-300 rounded-lg overflow-hidden print:border-none print:h-auto print:min-h-screen">
                        <iframe
                            src={material.pdfUrl}
                            className="w-full h-full print:w-[210mm] print:h-[297mm]"
                            title="PDF Viewer"
                        />
                    </div>
                ) : material.questions ? (
                    material.questions.map((q) => (
                        <section key={q.id}>
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-slate-800 text-white rounded-full text-sm">{q.id}</span>
                                {q.title}（各{q.points}点）
                            </h2>
                            <div className={`pl-8 text-lg ${q.items.some(item => item.answerArea === 'calc') ? 'grid grid-cols-2 gap-y-12' : 'space-y-12'}`}>
                                {q.items.map((item, index) => (
                                    <div key={item.id} className={q.items.some(i => i.answerArea === 'calc') ? '' : 'flex'}>
                                        <span className="mr-2">({index + 1})</span>
                                        <div className="flex-1">
                                            {/* 問題文の改行対応 (\n を <br/> に変換) */}
                                            <p className={item.answerArea === 'calc' ? 'ml-2 inline-block' : 'mb-6 leading-relaxed'}>
                                                {item.text.split('\\n').map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        {i !== item.text.split('\\n').length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>

                                            {/* 解答欄の出し分け */}
                                            {item.answerArea === 'short' && (
                                                <p className={item.text.includes('\\n') ? 'mt-4' : 'mt-8'}>答．<span className="inline-block w-48 border-b border-slate-400"></span></p>
                                            )}
                                            {item.answerArea === 'long' && (
                                                <div className="border-b border-slate-400 w-full h-8 mt-2"></div>
                                            )}
                                            {item.answerArea === 'calc' && (
                                                <span className="ml-4 pr-2"></span>
                                            )}
                                            {item.answerArea === 'blank' && null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="text-center text-slate-500 py-20">問題データまたはPDFファイルが登録されていません。</div>
                )}
            </div>

            {/* フッター */}
            <div className="absolute bottom-12 w-[calc(100%-6rem)] text-center text-xs text-slate-400 pt-4 border-t border-slate-200">
                &copy; 学習塾Sin° All Rights Reserved. - {material.id}
            </div>
        </div>
    );
}
