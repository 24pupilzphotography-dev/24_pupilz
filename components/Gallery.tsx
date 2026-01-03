"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";

interface SectionCover {
    section_id: string;
    image_url: string;
}

const categories = [
    {
        id: "wedding",
        title: "Wedding Photography",
        subtitle: "Timeless moments of love",
    },
    {
        id: "Baby Shower",
        title: "Baby Shower",
        subtitle: "Celebrating new beginnings",
    },
    {
        id: "Puberty Ceremony",
        title: "Puberty Ceremony",
        subtitle: "Traditional elegance",
    },
    {
        id: "commercial",
        title: "Photoshoot",
        subtitle: "Creative portraits",
    },
];

export default function Gallery() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [covers, setCovers] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchCovers();
    }, []);

    const fetchCovers = async () => {
        const { data, error } = await supabase
            .from("section_covers")
            .select("*");

        if (error) {
            console.error("Error fetching covers:", error);
        } else {
            const coversMap: Record<string, string> = {};
            data?.forEach((cover: SectionCover) => {
                coversMap[cover.section_id] = cover.image_url;
            });
            setCovers(coversMap);
        }
    };

    return (
        <section id="gallery" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">Our Work</p>
                    <h2 className="section-title font-serif">Portfolio</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                        Create your own story from us! Made with love at 24_pupilz Photography.
                    </p>
                </motion.div>

                {/* Gallery Grid - Masonry-like layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative group ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                }`}
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <Link href={`/gallery/${category.id}`} className={`block ${index === 0 ? "md:h-full" : ""}`}>
                                <div className={`relative overflow-hidden rounded-2xl ${index === 0
                                    ? "aspect-[4/3] md:aspect-auto md:h-full"
                                    : "aspect-[4/3]"
                                    }`}>
                                    {covers[category.id] ? (
                                        <Image
                                            src={covers[category.id]}
                                            alt={category.title}
                                            fill
                                            unoptimized
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                // Fallback for broken image
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const parent = target.parentElement;
                                                if (parent) {
                                                    const fallback = document.createElement('div');
                                                    fallback.className = 'w-full h-full flex items-center justify-center bg-muted';
                                                    fallback.innerHTML = '<span class="text-muted-foreground">Image Unavailable</span>';
                                                    parent.appendChild(fallback);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted">
                                            <span className="text-muted-foreground">No Cover Image</span>
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{
                                                y: hoveredId === category.id ? 0 : 10,
                                                opacity: 1
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="text-accent text-sm uppercase tracking-wider mb-2">
                                                {category.subtitle}
                                            </p>
                                            <h3 className={`font-serif font-bold text-white mb-4 ${index === 0
                                                ? "text-3xl md:text-4xl"
                                                : "text-xl md:text-2xl"
                                                }`}>
                                                {category.title}
                                            </h3>

                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{
                                                    opacity: hoveredId === category.id ? 1 : 0,
                                                    x: hoveredId === category.id ? 0 : -10
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-center gap-2 text-accent"
                                            >
                                                <span className="text-sm font-medium uppercase tracking-wider">View Gallery</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Border accent on hover */}
                                    <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a href="#contact" className="btn-outline inline-flex items-center gap-2">
                        Enquire Now
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
