"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "ホーム", href: "/" },
        { name: "特徴", href: "/#features" },
        { name: "ウッディタウン教室", href: "/#woodytown" },
        { name: "上津台教室", href: "/#kozudai" },
        { name: "お知らせ", href: "/#news" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-3 text-slate-800"
                : "bg-transparent py-5 text-white"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <GraduationCap className={`w-8 h-8 transition-colors ${isScrolled ? "text-blue-600" : "text-white"}`} />
                    <span className="text-xl font-bold tracking-wider">
                        学習塾<span className={isScrolled ? "text-blue-600" : "text-blue-200"}>サイン</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-amber-400 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className={`px-5 py-2 rounded-full font-bold transition-all ${isScrolled
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                            : "bg-white text-blue-900 hover:bg-blue-50"
                            }`}
                    >
                        お問い合わせ
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg text-slate-800 flex flex-col items-center py-6 gap-6 font-semibold"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center py-2 hover:text-blue-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-8 py-3 bg-blue-600 text-white rounded-full shadow-md w-11/12 text-center"
                    >
                        お問い合わせ
                    </Link>
                </motion.nav>
            )}
        </header>
    );
}
