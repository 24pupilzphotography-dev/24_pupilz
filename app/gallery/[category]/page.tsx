"use client";

import { useEffect, useState, use, useMemo } from "react";
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
    const { category: encodedCategory } = use(params);
    const category = decodeURIComponent(encodedCategory);
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
            "Puberty Ceremony": "Puberty Ceremony",
            "Baby Shower": "Baby Shower",
            commercial: "Commercial Shoots",
        };
        return map[cat] || cat;
    };

    // Hook to determine number of columns based on window width
    const [columnCount, setColumnCount] = useState(3);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 768) setColumnCount(1);
            else if (window.innerWidth < 1024) setColumnCount(2);
            else setColumnCount(3);
        };

        // Initial call
        updateColumns();

        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    // Distribute images into columns
    const columns = useMemo(() => {
        const cols: Image[][] = Array.from({ length: columnCount }, () => []);
        images.forEach((image, index) => {
            cols[index % columnCount].push(image);
        });
        return cols;
    }, [images, columnCount]);

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
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
                    <div className="flex flex-col md:flex-row gap-6">
                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className="flex-1 space-y-6">
                                {col.map((image, imageIndex) => (
                                    <motion.div
                                        key={image.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: imageIndex * 0.1 }}
                                        className="relative overflow-hidden rounded-lg group cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`${category} photo`}
                                            className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                    </motion.div>
                                ))}
                            </div>
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
