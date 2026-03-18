"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight } from "lucide-react";

interface SchoolCardProps {
    name: string;
    subtitle: string;
    description: string;
    address: string;
    phone: string;
    delay?: number;
}

export default function SchoolCard({ name, subtitle, description, address, phone, delay = 0 }: SchoolCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full"
        >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{name}</h3>
                <p className="text-blue-300 font-medium">{subtitle}</p>
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                    {description}
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-slate-700">
                        <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                        <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                        <span className="text-sm font-medium">{phone}</span>
                    </div>
                </div>

                <a
                    href="#contact"
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-slate-50 text-blue-600 font-bold hover:bg-blue-50 transition-colors border border-blue-100 group"
                >
                    お問い合わせはこちら
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.div>
    );
}
