import HeroSection from "@/components/public/HeroSection";
import FeatureCard from "@/components/public/FeatureCard";
import SchoolCard from "@/components/public/SchoolCard";
import { Sparkles, Brain, Target, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            <span className="text-blue-600 font-black">サ</span>インが選ばれる理由
                        </h2>
                        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            生徒一人ひとりに寄り添い、確実な学力向上と志望校合格をサポートします。
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<Sparkles className="w-7 h-7" />}
                            title="一問一問生解説"
                            description="生徒が納得するまで、講師が直接、その場で丁寧に解説。わからないまま進むことはありません。"
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Brain className="w-7 h-7" />}
                            title="徹底した個別対応"
                            description="一人ひとりの学習進度や理解度に合わせたカリキュラムで、無理なく無駄のない学習を実現します。"
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Target className="w-7 h-7" />}
                            title="逆転合格メソッド"
                            description="今の成績が届かなくても諦めない。「偏差値40から70へ」導く独自のノウハウと熱意があります。"
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={<Users className="w-7 h-7" />}
                            title="中高一貫のサポート"
                            description="中学から高校、そして大学受験までを見据えた長期的な視野での指導を一貫して提供します。"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Schools Section */}
            <section id="schools" className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">教室のご案内</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div id="woodytown">
                            <SchoolCard
                                name="ウッディタウン教室"
                                subtitle="サイン ウッディタウン教室"
                                description="最寄り駅から徒歩圏内。明るく集中できる学習環境を整えています。"
                                address="兵庫県三田市すずかけ台..."
                                phone="079-559-0000 (代表)"
                                delay={0.1}
                            />
                        </div>

                        <div id="kozudai">
                            <SchoolCard
                                name="上津台教室"
                                subtitle="サイン 上津台教室"
                                description="閑静な住宅街に位置し、落ち着いて勉強に取り組める教室です。"
                                address="兵庫県神戸市北区上津台..."
                                phone="078-986-0000 (代表)"
                                delay={0.3}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-24 bg-blue-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">まずは無料体験授業へ</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        教室の雰囲気や指導方針を実際に体験してみてください。強引な勧誘は一切行いません。
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-10 py-5 font-bold text-blue-900 transition-all bg-amber-400 rounded-full hover:bg-amber-300 hover:scale-105 shadow-xl text-lg"
                    >
                        お問い合わせ・体験申込
                    </Link>
                </div>
            </section>
        </div>
    );
}
