"use client";

import { Camera, Heart, Baby, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const services = [
    {
        id: "wedding",
        title: "Wedding Photography",
        shortDesc: "Capturing the magic of your special day",
        fullDesc: "Wedding photography is not just about capturing moments — at 24_pupilz, it's about celebrating love. We believe in capturing natural smiles, unposed emotions, and genuine interactions. Our team blends into your celebrations, approaches each moment with creativity, and works tirelessly to help you relive those precious memories for years to come.",
        Icon: Heart,
    },
    {
        id: "baby-shower",
        title: "Baby Shower",
        shortDesc: "Celebrating new beginnings beautifully",
        fullDesc: "Baby shower photography is all about capturing the joy and excitement of welcoming a new life. At 24_pupilz, we make sure each moment of celebration is captured beautifully — from the decorations and games to the heartfelt emotions of family and friends gathering to shower love on the parents-to-be.",
        Icon: Baby,
    },
    {
        id: "puberty",
        title: "Puberty Ceremony",
        shortDesc: "Traditional ceremonies with modern elegance",
        fullDesc: "Puberty ceremonies are significant cultural milestones that deserve to be documented with care and respect. At 24_pupilz, we specialize in capturing these traditional ceremonies while bringing a modern, elegant touch to the photography. Every ritual, every blessing, every smile — preserved forever.",
        Icon: Sparkles,
    },
    {
        id: "commercial",
        title: "Commercial Shoots",
        shortDesc: "Elevating your brand image",
        fullDesc: "Commercial photography requires a keen eye for detail and understanding of brand aesthetics. At 24_pupilz, we deliver high-quality product and lifestyle photography that elevates your brand image. From product catalogs to lifestyle campaigns, we bring your vision to life with precision and creativity.",
        Icon: Camera,
    },
];

export default function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % services.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <section id="services" className="py-24 bg-muted overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">Excellence in every frame</p>
                    <h2 className="section-title font-serif">Our Expertise</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                        We offer a diverse range of premium photography services tailored to your unique needs.
                    </p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto h-[600px] md:h-[450px]">
                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 hidden sm:block">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 hidden sm:block">
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 }
                            }}
                            className="absolute inset-0"
                        >
                            <div className="flex flex-col md:flex-row bg-card border border-border h-full overflow-hidden shadow-2xl">
                                {/* Visual Side */}
                                <div className="md:w-2/5 p-12 bg-accent/5 flex items-center justify-center relative">
                                    <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                                        <div className="w-64 h-64 border-2 border-accent rounded-full animate-pulse" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                            {(() => {
                                                const Icon = services[currentIndex].Icon;
                                                return <Icon className="w-12 h-12 text-accent" />;
                                            })()}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-2">
                                                {services[currentIndex].shortDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                                        {services[currentIndex].title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                        {services[currentIndex].fullDesc}
                                    </p>
                                    <div>
                                        <a
                                            href="#contact"
                                            className="btn-primary inline-flex items-center gap-2"
                                        >
                                            Enquire Now
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {services.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-2 transition-all duration-300 rounded-full ${currentIndex === idx
                                    ? "w-8 bg-accent"
                                    : "w-2 bg-border hover:bg-muted-foreground"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
