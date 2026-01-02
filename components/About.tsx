"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Camera, Users, Award } from "lucide-react";

const features = [
    "Candid & artistic photography",
    "Professional editing",
    "Same-day previews available",
    "Flexible packages",
];

const stats = [
    { number: "100+", label: "Happy Clients", icon: Users },
    { number: "500+", label: "Photos Delivered", icon: Camera },
    { number: "5+", label: "Years Experience", icon: Award },
];

export default function About() {
    const [image, setImage] = useState("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop");

    useEffect(() => {
        const fetchImage = async () => {
            const { data } = await supabase
                .from("section_covers")
                .select("image_url")
                .eq("section_id", "behind_lens")
                .single();

            if (data?.image_url) {
                setImage(data.image_url);
            }
        };
        fetchImage();
    }, []);

    return (
        <section id="about" className="py-24 bg-muted">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">About Us</p>
                    <h2 className="section-title font-serif">Why 24_pupilz?</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                                src={image}
                                alt="24_pupilz Photography"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            {/* Decorative elements */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent -z-10" />
                        </div>

                        {/* Experience Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 shadow-2xl"
                        >
                            <span className="block text-4xl font-bold">5+</span>
                            <span className="text-sm uppercase tracking-wider">Years of Experience</span>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                            Behind the Lens
                        </h3>
                        
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            At <span className="text-accent font-semibold">24_pupilz</span>, we believe that every 
                            photograph has a story to tell. Our passion lies in capturing the raw, unfiltered 
                            emotions that make life beautiful.
                        </p>
                        
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            With years of experience in various styles of photography, we bring a unique perspective 
                            to every shoot. Whether it's a grand wedding or an intimate portrait session, we strive 
                            for perfection in every frame. Trust us to capture your special moments with heart, 
                            soul, and precision.
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                                    <span className="text-foreground">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a href="#contact" className="btn-primary inline-block">
                            Book a Consultation
                        </a>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border p-8 text-center group hover:border-accent transition-colors duration-300"
                        >
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                                <stat.icon className="w-8 h-8 text-accent" />
                            </div>
                            <span className="block text-4xl font-bold text-accent mb-2">{stat.number}</span>
                            <span className="text-muted-foreground uppercase tracking-wider text-sm">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
