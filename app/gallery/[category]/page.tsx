"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface Image {
    id: number;
    url: string;
    category: string;
    created_at: string;
}

export default function GalleryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const { data, error } = await supabase
                    .from("images")
                    .select("*")
                    .eq("category", category)
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setImages(data || []);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, [category]);

    const formatCategory = (cat: string) => {
        const map: Record<string, string> = {
            wedding: "Wedding Photography",
            event: "Event Photography",
            portrait: "Portrait Sessions",
            commercial: "Commercial Shoots",
        };
        return map[cat] || cat;
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/#gallery"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Gallery
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold capitalize">
                        {formatCategory(category)}
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No images found in this category yet.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-lg group break-inside-avoid mb-6 cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.url}
                                    alt={`${category} photo ${index + 1}`}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </motion.div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <motion.div
                                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedImage.url}
                                    alt="Selected view"
                                    className="max-w-full max-h-full object-contain"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
