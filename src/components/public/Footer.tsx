import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-white">
                        <GraduationCap className="w-8 h-8 text-blue-500" />
                        <span className="text-2xl font-bold tracking-wider">
                            学習塾<span className="text-blue-500">サイン</span>
                        </span>
                    </Link>
                    <p className="text-sm max-w-sm mt-4 text-slate-400">
                        「わかった！」の合図を一生の自信に！<br />
                        迷える背中を、志望校へ導くサイン。
                    </p>
                    <p className="text-sm text-slate-500 mt-6">
                        &copy; {new Date().getFullYear()} 学習塾サイン. All Rights Reserved.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">教室案内</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#woodytown" className="hover:text-blue-400 transition">ウッディタウン教室</Link>
                        </li>
                        <li>
                            <Link href="#kozudai" className="hover:text-blue-400 transition">上津台教室</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">リンク</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/login" className="hover:text-blue-400 transition">塾生ログイン (システム)</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-blue-400 transition">お問い合わせ</Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-blue-400 transition">プライバシーポリシー</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
