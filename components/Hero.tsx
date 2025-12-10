"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
    const [heroImage, setHeroImage] = useState("");

    useEffect(() => {
        fetchHeroCover();
    }, []);

    const fetchHeroCover = async () => {
        const { data, error } = await supabase
            .from("section_covers")
            .select("image_url")
            .eq("section_id", "hero")
            .single();

        if (data?.image_url) {
            setHeroImage(data.image_url);
        }
    };
    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: `url('${heroImage}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black" />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute top-6 left-6 z-20 flex items-center gap-3"
            >
                <img
                    src="/logo web.png"
                    alt="24_pupilz Logo"
                    className="w-12 h-12 md:w-20 md:h-20 object-contain"
                />
                <span className="text-white text-lg md:text-2xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-autography)' }}>
                    24 Pupilz Photography
                </span>
            </motion.div>

            <div className="relative z-10 text-center px-4 -mt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-6 tracking-tight"
                >
                    Capturing <span className="text-accent italic">Soul</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light"
                >
                    Professional photography that tells your unique story through the lens of 24_pupilz.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="#gallery"
                        className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
                    >
                        View Portfolio
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
        </section>
    );
}
