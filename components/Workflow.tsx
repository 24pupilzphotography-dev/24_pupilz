"use client";

import { motion } from "framer-motion";
import { MessageSquare, Camera, Sparkles, Package } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Pre-Planning",
        description: "We plan and analyze your requirements, discuss your vision, and finalize the details.",
        Icon: MessageSquare,
    },
    {
        number: "02",
        title: "On Shoot",
        description: "We capture the precise moments with creativity, care, and professional expertise.",
        Icon: Camera,
    },
    {
        number: "03",
        title: "Post Processing",
        description: "Enhancing your moments with professional editing and color grading.",
        Icon: Sparkles,
    },
    {
        number: "04",
        title: "Delivered",
        description: "Get your lifetime memories as beautifully crafted deliverables.",
        Icon: Package,
    },
];

export default function Workflow() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">Workflow Matters A Lot</p>
                    <h2 className="section-title font-serif">We provide high quality services</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mt-4">
                        Our streamlined process ensures you get the best experience from start to finish.
                    </p>
                </motion.div>

                {/* Workflow Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="bg-card border border-border p-8 text-center relative z-10 card-hover">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground w-8 h-8 flex items-center justify-center text-sm font-bold">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                                        <step.Icon className="w-10 h-10 text-accent" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-accent transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 z-20">
                                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-accent" 
                                             style={{ transform: 'translateY(-50%)' }} 
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mt-16"
                >
                    <a href="#contact" className="btn-primary">
                        Contact Us
                    </a>
                    <a href="#faq" className="btn-outline">
                        FAQ
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

