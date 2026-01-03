"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import HeroContent from "./HeroContent";

interface Image {
    url: string;
    show_in_hero_mobile: boolean;
    show_in_hero_desktop: boolean;
}

export default function Hero() {
    const [slides, setSlides] = useState<string[]>([]);
    const [allSlidesData, setAllSlidesData] = useState<Image[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const goToSlide = useCallback((index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    }, [activeIndex]);

    const nextSlide = useCallback(() => {
        if (slides.length <= 1) return;
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        if (slides.length <= 1) return;
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    useEffect(() => {
        // Update slides whenever isMobile or allSlidesData changes
        if (allSlidesData.length > 0) {
            const filtered = allSlidesData
                .filter(img => isMobile ? img.show_in_hero_mobile : img.show_in_hero_desktop)
                .map(img => img.url);

            if (filtered.length > 0) {
                setSlides(filtered);
                // Reset index if current one is out of bounds
                if (activeIndex >= filtered.length) setActiveIndex(0);
                return;
            }

            // Fallback if no device-specific images are found
            const fallback = allSlidesData.slice(0, 5).map(img => img.url);
            setSlides(fallback);
        }
    }, [isMobile, allSlidesData]);

    const fetchHeroSlides = async () => {
        try {
            // Try fetching with specific hero flags first
            let { data: allImages, error: fetchError } = await supabase
                .from("images")
                .select("url, show_in_hero_mobile, show_in_hero_desktop")
                .order("created_at", { ascending: false });

            // If it fails (likely missing columns), fallback to just URL
            if (fetchError) {
                console.warn("Hero flags fetch failed, falling back to basic fetch:", fetchError.message);
                const { data: fallbackImages, error: fallbackError } = await supabase
                    .from("images")
                    .select("url")
                    .order("created_at", { ascending: false });

                if (fallbackError) throw fallbackError;

                // Manually add flags to the fallback data so the filtering logic doesn't crash
                allImages = (fallbackImages ?? []).map(img => ({
                    ...img,
                    show_in_hero_mobile: false,
                    show_in_hero_desktop: false
                }));
            }

            if (allImages) {
                setAllSlidesData(allImages as any);
            }

            // If no images at all, fall back to cover or logo
            if (!allImages || allImages.length === 0) {
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
            }
        } catch (error) {
            console.error("Critical error in fetchHeroSlides:", error);
            setSlides(["/logo web.png"]);
        }
    };



    return (
        <section
            id="home"
            className="relative w-full h-[calc(100vh-80px)] overflow-hidden"
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
                                    className="relative z-10 w-full h-full object-cover"
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
            <HeroContent />

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
