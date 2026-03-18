"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white z-10">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900 z-0" />
            </div>

            <div className="container relative z-20 px-6 lg:px-12 text-center md:text-left flex flex-col items-center md:items-start pt-20 pb-32 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl relative z-50 pointer-events-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm tracking-wider mb-6 border border-blue-500/30">
                        学びは成長
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        偏差値40から70へ。<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">
                            逆転合格のノウハウ
                        </span>
                        を直接指導。
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                        「わかった！」の合図を一生の自信に！<br />
                        迷える背中を、志望校へ導く新しい学びの形がここにあります。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 relative z-50 pointer-events-auto">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] focus:outline-none pointer-events-auto"
                        >
                            無料体験授業に申し込む
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center justify-center px-8 py-4 font-bold text-slate-300 transition-all duration-300 border border-slate-700 rounded-full hover:bg-slate-800 hover:text-white focus:outline-none pointer-events-auto"
                        >
                            選ばれる理由を見る
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Bottom Wave/Curve */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
        </section>
    );
}
