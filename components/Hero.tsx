"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
    const [slides, setSlides] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        fetchHeroSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;
        
        intervalRef.current = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        
        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [slides.length, isPaused]);

    const fetchHeroSlides = async () => {
        const { data: imageRows } = await supabase
            .from("images")
            .select("url, created_at")
            .order("created_at", { ascending: false });

        const urls = (imageRows ?? [])
            .map((r: { url: string }) => r.url)
            .filter(Boolean);

        if (urls.length > 0) {
            setSlides(urls);
            return;
        }

        const { data: coverRow } = await supabase
            .from("section_covers")
            .select("image_url")
            .eq("section_id", "hero")
            .single();

        if (coverRow?.image_url) setSlides([coverRow.image_url]);
    };

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section 
            id="home" 
            className="relative w-full h-screen overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Full-screen Image Slider */}
            <div className="absolute inset-0">
                {(slides.length ? slides : ["/logo web.png"]).map((src, idx) => (
                    <motion.div
                        key={`${src}-${idx}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: idx === activeIndex ? 1 : 0,
                            scale: idx === activeIndex ? 1 : 1.1
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <img
                            src={src}
                            alt={`Hero slide ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading={idx === 0 ? "eager" : "lazy"}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-5xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="section-subtitle mb-4"
                    >
                        Create your own story with us!
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
                    >
                        Capturing <span className="text-accent italic">Moments</span>
                        <br />
                        <span className="text-3xl md:text-5xl lg:text-6xl">That Last Forever</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
                    >
                        Professional photography that tells your unique story with authenticity and artistry.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a href="#gallery" className="btn-primary">
                            View Portfolio
                        </a>
                        <a href="#contact" className="btn-outline">
                            Book a Session
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-accent text-white hover:text-black transition-all duration-300 rounded-full backdrop-blur-sm"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-accent text-white hover:text-black transition-all duration-300 rounded-full backdrop-blur-sm"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Slide Indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => goToSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2 rounded-full transition-all duration-500 ${
                                idx === activeIndex 
                                    ? "w-12 bg-accent" 
                                    : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-accent rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
