"use client";

import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
                    >
                        お問い合わせ・無料体験予約
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-6"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-600 text-lg"
                    >
                        学習塾サインにご関心をお寄せいただきありがとうございます。<br />
                        まずは各教室の公式LINEより、お気軽にお問い合わせください。
                    </motion.p>
                </div>

                <div className="space-y-12">
                    {/* LINE Contact Section (Primary) */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b-2 border-slate-200 pb-3">
                            <MessageCircle className="w-8 h-8 text-[#06C755]" />
                            LINEでお問い合わせ（推奨）
                        </h2>
                        <p className="text-slate-600 mb-6">
                            教室ごとの公式LINEアカウントをご用意しております。<br />
                            「無料体験を希望」「詳しい話を聞きたい」など、トーク画面から直接メッセージをお送りください。
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Woodytown LINE */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-[#06C755]/20 flex flex-col items-center text-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-[#06C755]"></div>
                                <div className="w-16 h-16 bg-[#06C755]/10 rounded-full flex items-center justify-center mb-4">
                                    <MessageCircle className="w-8 h-8 text-[#06C755]" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">ウッディタウン教室</h3>
                                <p className="text-sm text-slate-500 mb-6 flex-grow">
                                    三田市すずかけ台方面の方はこちらのLINEからお問い合わせください。
                                </p>
                                <a
                                    href="https://line.me/R/ti/p/@example_woody" // TODO: リリース時に本物のLINE URLに変更する
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 px-6 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-xl transition-colors shadow-md shadow-[#06C755]/20 flex items-center justify-center gap-2"
                                >
                                    LINEで相談する
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </motion.div>

                            {/* Kozudai LINE */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-[#06C755]/20 flex flex-col items-center text-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-[#06C755]"></div>
                                <div className="w-16 h-16 bg-[#06C755]/10 rounded-full flex items-center justify-center mb-4">
                                    <MessageCircle className="w-8 h-8 text-[#06C755]" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">上津台教室</h3>
                                <p className="text-sm text-slate-500 mb-6 flex-grow">
                                    神戸市北区上津台方面の方はこちらのLINEからお問い合わせください。
                                </p>
                                <a
                                    href="https://line.me/R/ti/p/@example_kozudai" // TODO: リリース時に本物のLINE URLに変更する
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 px-6 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-xl transition-colors shadow-md shadow-[#06C755]/20 flex items-center justify-center gap-2"
                                >
                                    LINEで相談する
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </motion.div>
                        </div>
                    </section>

                    {/* Other Contact Methods (Secondary) */}
                    <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-8 border-b-2 border-slate-100 pb-3">
                            その他の方法でお問い合わせ
                        </h2>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Mail */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">メールでのお問い合わせ</h3>
                                </div>
                                <p className="text-slate-600 text-sm mb-4">
                                    24時間受け付けております。お返事に数日程度お時間をいただく場合がございます。
                                </p>
                                <a
                                    href="mailto:contact@splus-sin.com"
                                    className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
                                >
                                    contact@splus-sin.com
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* Phone */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">お電話でのお問い合わせ</h3>
                                </div>
                                <p className="text-slate-600 text-sm mb-4">
                                    受付時間：平日 15:00〜22:00（土日祝は休校）<br />
                                    ※授業中はお電話に出られない場合がございます。
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 w-24 text-center">ウッディタウン</span>
                                        <a href="tel:0795590000" className="text-slate-800 font-medium hover:text-blue-600 transition-colors">079-559-0000</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 w-24 text-center">上津台</span>
                                        <a href="tel:0789860000" className="text-slate-800 font-medium hover:text-blue-600 transition-colors">078-986-0000</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
