"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
    const [slides, setSlides] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const scrollEndTimerRef = useRef<number | null>(null);
    const isAutoScrollingRef = useRef(false);

    useEffect(() => {
        fetchHeroSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;
        const id = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 3500);
        return () => window.clearInterval(id);
    }, [slides.length, isPaused]);

    useEffect(() => {
        const el = cardRefs.current[activeIndex];
        const container = containerRef.current;
        if (!el || !container) return;
        // Smoothly scroll the carousel horizontally only (never scroll the page vertically).
        const targetLeft = el.offsetLeft - (container.clientWidth - el.clientWidth) / 2;
        isAutoScrollingRef.current = true;
        container.scrollTo({ left: targetLeft, behavior: "smooth" });
        // Release the guard after the smooth scroll likely completes.
        window.setTimeout(() => {
            isAutoScrollingRef.current = false;
        }, 450);
    }, [activeIndex]);

    const syncActiveIndexFromScroll = () => {
        const container = containerRef.current;
        if (!container) return;
        if (isAutoScrollingRef.current) return;

        const centerX = container.scrollLeft + container.clientWidth / 2;
        let bestIdx = activeIndex;
        let bestDist = Number.POSITIVE_INFINITY;

        cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            const elCenter = el.offsetLeft + el.clientWidth / 2;
            const dist = Math.abs(elCenter - centerX);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = idx;
            }
        });

        if (bestIdx !== activeIndex) setActiveIndex(bestIdx);
    };

    const fetchHeroSlides = async () => {
        // Pull all images from `images` table for the hero slider
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

        // Fallback: use the single hero cover if no hero-category images exist
        const { data: coverRow } = await supabase
            .from("section_covers")
            .select("image_url")
            .eq("section_id", "hero")
            .single();

        if (coverRow?.image_url) setSlides([coverRow.image_url]);
    };
    return (
        <section id="home" className="relative w-full pt-24 md:pt-28 pb-16 bg-background">
            {/* Subtle ambient background for light theme */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,155,47,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.06),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-muted" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Sliding Image Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    {/* Make the carousel fill the first viewport so text only appears on scroll */}
                    <div className="h-[calc(100vh-7rem)] md:h-[calc(100vh-7.5rem)] flex flex-col justify-center">
                        <div
                            ref={containerRef}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onTouchStart={() => setIsPaused(true)}
                            onTouchEnd={() => setIsPaused(false)}
                            onScroll={() => {
                                // When user scrolls manually, pause autoplay and resume from that position.
                                if (!isAutoScrollingRef.current) setIsPaused(true);
                                if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
                                scrollEndTimerRef.current = window.setTimeout(() => {
                                    syncActiveIndexFromScroll();
                                    setIsPaused(false);
                                }, 180);
                            }}
                            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-proximity pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {(slides.length ? slides : ["/logo web.png"]).map((src, idx) => (
                                <div
                                    key={`${src}-${idx}`}
                                    ref={(el) => {
                                        cardRefs.current[idx] = el;
                                    }}
                            className={`snap-center shrink-0 w-[96vw] sm:w-[980px] md:w-[1180px] lg:w-[1320px] h-[62vh] md:h-[68vh] max-h-[760px] rounded-3xl overflow-hidden bg-muted border transition-colors duration-300 ${idx === activeIndex ? "border-accent" : "border-black/10"
                                        }`}
                                >
                                    {/* "Contain" image so it doesn't look cut; add a subtle blurred backdrop to still feel full */}
                                    <div className="relative w-full h-full">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-25"
                                            style={{ backgroundImage: `url('${src}')` }}
                                        />
                                        <img
                                            src={src}
                                            alt={`Hero slide ${idx + 1}`}
                                            className="relative w-full h-full object-contain"
                                            loading={idx === 0 ? "eager" : "lazy"}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dots */}
                        {slides.length > 1 && (
                            <div className="mt-5 flex justify-center gap-2">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveIndex(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`h-2.5 rounded-full transition-all ${idx === activeIndex ? "w-10 bg-accent" : "w-2.5 bg-foreground/20 hover:bg-foreground/30"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="mt-10 flex justify-center animate-bounce"
                        >
                            <ChevronDown className="w-8 h-8 text-foreground/40" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Hero Copy (below images; appears when user scrolls past carousel) */}
                <div className="text-center px-4 mt-16">
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
            </div>
        </section>
    );
}
