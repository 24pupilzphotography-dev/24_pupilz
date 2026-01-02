"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


export default function About() {
    const [isTapped, setIsTapped] = useState(false);
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
        <section id="about" className="py-20 bg-muted">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-square"
                        onTouchStart={() => setIsTapped(true)}
                        onTouchEnd={() => setTimeout(() => setIsTapped(false), 2000)}
                    >
                        <Image
                            src={image}
                            alt="Photographer"
                            fill
                            unoptimized
                            className={`object-cover transition-all duration-500 ${isTapped ? '' : 'grayscale'
                                } md:grayscale md:hover:grayscale-0`}
                        />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-accent z-10" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-black/10 z-0" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            Behind the Lens
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            At <span className="text-accent font-bold">24_pupilz</span>, we believe that every photograph has a story to tell.
                            Our passion lies in capturing the raw, unfiltered emotions that make life beautiful.
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                            With years of experience in various styles of photography, we bring a unique perspective to every shoot.
                            Whether it's a grand wedding or an intimate portrait session, we strive for perfection in every frame.
                        </p>

                        <div className="flex gap-8">
                            <div className="flex gap-8">
                                <div>
                                    <span className="block text-4xl font-bold text-accent mb-1">100+</span>
                                    <span className="text-sm uppercase tracking-widest text-muted-foreground">Happy Clients</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
