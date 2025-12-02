"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";


const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop", alt: "Wedding Photography" },
    { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", alt: "Portrait Photography" },
    { id: 3, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop", alt: "Event Photography" },
    { id: 4, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2064&auto=format&fit=crop", alt: "Fashion Photography" },
    { id: 5, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop", alt: "Nature Photography" },
    { id: 6, src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2000&auto=format&fit=crop", alt: "Urban Photography" },
];

export default function Gallery() {
    const [tappedId, setTappedId] = useState<number | null>(null);

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[3/4] group overflow-hidden cursor-pointer"
                            onTouchStart={() => setTappedId(photo.id)}
                            onTouchEnd={() => setTimeout(() => setTappedId(null), 2000)}
                        >
                            <motion.div
                                animate={{ scale: tappedId === photo.id ? 1.1 : 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 md:group-hover:scale-110"
                                />
                            </motion.div>
                            <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center ${tappedId === photo.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                                }`}>
                                <span className="text-white font-serif text-xl tracking-widest border-b border-accent pb-1">
                                    {photo.alt}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
