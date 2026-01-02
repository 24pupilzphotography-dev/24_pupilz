"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Priya & Karthik",
        event: "Wedding Photography",
        text: "Had an amazing experience with 24_pupilz! They captured every precious moment of our wedding beautifully. The team was professional, creative, and made us feel so comfortable throughout the day.",
        location: "Sathyamangalam",
    },
    {
        id: 2,
        name: "Divya Lakshmi",
        event: "Baby Shower",
        text: "The team at 24_pupilz was wonderful! They captured the joy of our baby shower perfectly. The photos are stunning and we'll cherish them forever. Highly recommend!",
        location: "Erode",
    },
    {
        id: 3,
        name: "Ramesh & Family",
        event: "Puberty Ceremony",
        text: "Professional, punctual, and incredibly talented. 24_pupilz understood exactly what we wanted and delivered beyond our expectations. The traditional moments were captured with such elegance.",
        location: "Coimbatore",
    },
    {
        id: 4,
        name: "Sneha Mohan",
        event: "Portrait Session",
        text: "I was amazed by the quality of work. The attention to detail and the creative vision of 24_pupilz is outstanding. They made me feel like a star during the photoshoot!",
        location: "Salem",
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [isPaused]);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

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
                                "{testimonials[activeIndex].text}"
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

