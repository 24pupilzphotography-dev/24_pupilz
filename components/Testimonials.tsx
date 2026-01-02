"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";

type TestimonialRow = {
    id: number;
    name: string;
    event: string;
    feedback: string;
    location: string | null;
    created_at: string;
};

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [testimonials, setTestimonials] = useState<
        Array<{ id: number; name: string; event: string; feedback: string; location: string }>
    >([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from("testimonials")
                .select("id,name,event,feedback,location,created_at")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching testimonials:", error);
                return;
            }

            if (data && data.length > 0) {
                setTestimonials(
                    data.map((t: TestimonialRow) => ({
                        id: t.id,
                        name: t.name,
                        event: t.event,
                        feedback: t.feedback,
                        location: t.location ?? "",
                    }))
                );
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (isPaused) return;
        if (!testimonials.length) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    useEffect(() => {
        // keep index valid if list size changes
        if (activeIndex >= testimonials.length) setActiveIndex(0);
    }, [activeIndex, testimonials.length]);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (!testimonials.length) return null;

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">100+ Happy customers trusted 24_pupilz</p>
                    <h2 className="section-title font-serif">Words From Our Clients</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mt-4">
                        - 24_pupilz Testimonials -
                    </p>
                </motion.div>

                {/* Testimonial Carousel */}
                <div 
                    className="max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative">
                        {/* Quote Icon */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <Quote className="w-16 h-16 text-accent/20" />
                        </div>

                        {/* Testimonial Content */}
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-card border border-border p-8 md:p-12 text-center"
                        >
                            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                                "{testimonials[activeIndex].feedback}"
                            </p>
                            
                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-serif font-bold text-accent">
                                    {testimonials[activeIndex].name}
                                </h4>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {testimonials[activeIndex].event}
                                </p>
                                <p className="text-muted-foreground/60 text-xs mt-1 uppercase tracking-wider">
                                    {testimonials[activeIndex].location}
                                </p>
                            </div>
                        </motion.div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    idx === activeIndex 
                                        ? "bg-accent w-8" 
                                        : "bg-foreground/20 hover:bg-foreground/40"
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

