"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SectionCover {
    section_id: string;
    image_url: string;
}

const categories = [
    {
        id: "wedding",
        title: "Wedding Photography",
    },
    {
        id: "Baby Shower",
        title: "Baby shower",
    },
    {
        id: "Puberty Ceremony",
        title: "Puberty Ceremony",
    },
    {
        id: "commercial",
        title: "Photoshoot",
    },
];

export default function Gallery() {
    const [tappedId, setTappedId] = useState<string | null>(null);
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
        <section id="gallery" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Selected Works</h2>
                    <div className="w-24 h-1 bg-accent mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[16/9] group overflow-hidden cursor-pointer rounded-lg bg-muted border border-white/10"
                            onTouchStart={() => setTappedId(category.id)}
                            onTouchEnd={() => setTimeout(() => setTappedId(null), 2000)}
                        >
                            <Link href={`/gallery/${category.id}`} className="block w-full h-full">
                                <motion.div
                                    animate={{ scale: tappedId === category.id ? 1.1 : 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                    {covers[category.id] ? (
                                        <Image
                                            src={covers[category.id]}
                                            alt={category.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-500 md:group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted">
                                            <span className="text-muted-foreground">No Cover Image</span>
                                        </div>
                                    )}
                                </motion.div>
                                <div className={`absolute inset-0 bg-black/45 transition-opacity duration-300 flex items-center justify-center ${tappedId === category.id ? 'opacity-100' : 'opacity-100'
                                    }`}>
                                    <span className="text-white font-serif text-2xl md:text-3xl tracking-widest border-b-2 border-accent pb-2 uppercase">
                                        {category.title}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
