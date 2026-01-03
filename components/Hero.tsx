"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function Hero() {
    const [slides, setSlides] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const goToSlide = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        fetchHeroSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;

        intervalRef.current = window.setInterval(nextSlide, 5000);

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [slides.length, isPaused, nextSlide]);

    const fetchHeroSlides = async () => {
        // 1. Try to fetch images specifically marked for hero
        const { data: heroImages, error: heroError } = await supabase
            .from("images")
            .select("url")
            .eq("show_in_hero", true)
            .order("created_at", { ascending: false });

        if (!heroError && heroImages && heroImages.length > 0) {
            setSlides(heroImages.map(img => img.url));
            return;
        }

        // 2. Fallback: If no images are marked, fetch 5 most recent images
        const { data: recentImages } = await supabase
            .from("images")
            .select("url")
            .order("created_at", { ascending: false })
            .limit(5);

        if (recentImages && recentImages.length > 0) {
            setSlides(recentImages.map(img => img.url));
            return;
        }

        // 3. Last fallback: Section cover or logo
        const { data: coverRow } = await supabase
            .from("section_covers")
            .select("image_url")
            .eq("section_id", "hero")
            .single();

        if (coverRow?.image_url) {
            setSlides([coverRow.image_url]);
        } else {
            setSlides(["/logo web.png"]);
        }
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
                <AnimatePresence initial={false} custom={direction}>
                    {(slides.length ? slides : ["/logo web.png"]).map((src, idx) => (
                        idx === activeIndex && (
                            <motion.div
                                key={`${src}-${idx}`}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({
                                        x: direction > 0 ? "100%" : "-100%",
                                        opacity: 0
                                    }),
                                    center: {
                                        zIndex: 1,
                                        x: 0,
                                        opacity: 1
                                    },
                                    exit: (direction: number) => ({
                                        zIndex: 0,
                                        x: direction < 0 ? "100%" : "-100%",
                                        opacity: 0
                                    })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.5 }
                                }}
                                className="absolute inset-0 bg-black z-0"
                            >
                                {/* Blurred background layer */}
                                <img
                                    src={src}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 transform scale-110 pointer-events-none"
                                />
                                {/* Foreground full image */}
                                <img
                                    src={src}
                                    alt={`Hero slide ${idx + 1}`}
                                    className="relative z-10 w-full h-full object-cover lg:object-contain"
                                    loading={idx === 0 ? "eager" : "lazy"}
                                />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pt-20 z-30">
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
                <div className="absolute inset-0 pointer-events-none z-50">
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/50 hover:bg-accent text-white hover:text-black transition-all duration-300 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto group"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/50 hover:bg-accent text-white hover:text-black transition-all duration-300 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto group"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40"
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
