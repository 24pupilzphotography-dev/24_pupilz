"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
    {
        id: "wedding",
        title: "Wedding Photography",
        src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "portrait",
        title: "Portrait Sessions",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "event",
        title: "Event Coverage",
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop"
    },
    {
        id: "commercial",
        title: "Commercial Shoots",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2064&auto=format&fit=crop"
    },
];

export default function Gallery() {
    const [tappedId, setTappedId] = useState<string | null>(null);

    return (
        <section id="gallery" className="py-20 bg-black">
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
                            className="relative aspect-[16/9] group overflow-hidden cursor-pointer rounded-lg"
                            onTouchStart={() => setTappedId(category.id)}
                            onTouchEnd={() => setTimeout(() => setTappedId(null), 2000)}
                        >
                            <Link href={`/gallery/${category.id}`} className="block w-full h-full">
                                <motion.div
                                    animate={{ scale: tappedId === category.id ? 1.1 : 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={category.src}
                                        alt={category.title}
                                        fill
                                        className="object-cover transition-transform duration-500 md:group-hover:scale-110"
                                    />
                                </motion.div>
                                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${tappedId === category.id ? 'opacity-100' : 'opacity-100'
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
