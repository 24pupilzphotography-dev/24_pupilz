"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop", alt: "Wedding Photography" },
    { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", alt: "Portrait Photography" },
    { id: 3, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop", alt: "Event Photography" },
    { id: 4, src: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2053&auto=format&fit=crop", alt: "Fashion Photography" },
    { id: 5, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop", alt: "Nature Photography" },
    { id: 6, src: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=2070&auto=format&fit=crop", alt: "Urban Photography" },
];

export default function Gallery() {
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
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[3/4] group overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
