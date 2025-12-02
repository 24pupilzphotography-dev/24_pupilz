"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-square"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2053&auto=format&fit=crop"
                            alt="Photographer"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-accent z-10" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-white/20 z-0" />
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
                        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                            At <span className="text-accent font-bold">24_pupilz</span>, we believe that every photograph has a story to tell.
                            Our passion lies in capturing the raw, unfiltered emotions that make life beautiful.
                        </p>
                        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                            With years of experience in various styles of photography, we bring a unique perspective to every shoot.
                            Whether it's a grand wedding or an intimate portrait session, we strive for perfection in every frame.
                        </p>

                        <div className="flex gap-8">
                            <div className="flex gap-8">
                                <div>
                                    <span className="block text-4xl font-bold text-accent mb-1">100+</span>
                                    <span className="text-sm uppercase tracking-widest text-gray-400">Happy Clients</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
