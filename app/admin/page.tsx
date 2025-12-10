"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

interface Image {
    id: number;
    url: string;
    category: string;
    created_at: string;
}

interface SectionCover {
    section_id: string;
    image_url: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState("wedding");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [covers, setCovers] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isAuthenticated) {
            fetchMessages();
            fetchImages();
            fetchCovers();
        }
    }, [isAuthenticated]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            setMessages(data || []);
        }
    };

    const fetchImages = async () => {
        const { data, error } = await supabase
            .from("images")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching images:", error);
        } else {
            setImages(data || []);
        }
    };

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

    const setAsCover = async (imageUrl: string, category: string) => {
        const { error } = await supabase
            .from("section_covers")
            .upsert({ section_id: category, image_url: imageUrl });

        if (error) {
            console.error("Error setting cover:", error);
            alert("Failed to set cover image");
        } else {
            setCovers({ ...covers, [category]: imageUrl });
            alert(`Updated cover for ${category}`);
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        const { error } = await supabase
            .from("messages")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting message:", error);
            alert("Failed to delete message");
        } else {
            setMessages(messages.filter((msg) => msg.id !== id));
        }
    };

    const deleteImage = async (id: number, url: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            // 1. Delete from Storage
            // Extract path from URL: .../portfolio/wedding/123.jpg -> wedding/123.jpg
            const path = url.split("/portfolio/")[1];
            if (path) {
                const { error: storageError } = await supabase.storage
                    .from("portfolio")
                    .remove([path]);

                if (storageError) {
                    console.error("Error deleting from storage:", storageError);
                    // Continue to delete from DB even if storage fails (to clean up broken links)
                }
            }

            // 2. Delete from Database
            const { error: dbError } = await supabase
                .from("images")
                .delete()
                .eq("id", id);

            if (dbError) throw dbError;

            setImages(images.filter((img) => img.id !== id));
        } catch (error: any) {
            console.error("Error deleting image:", error);
            alert(`Failed to delete image: ${error.message}`);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "Dharineesh" && password === "123456") {
            setIsAuthenticated(true);
        } else {
            alert("Invalid credentials");
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setMessage("");

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${category}/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("portfolio")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from("portfolio")
                .getPublicUrl(filePath);

            // Insert into Database
            const { error: dbError } = await supabase
                .from("images")
                .insert([{ url: publicUrl, category }]);

            if (dbError) throw dbError;

            setMessage("Upload successful!");
            setFile(null);
            fetchImages(); // Refresh list
        } catch (error: any) {
            console.error("Error uploading:", error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md border border-zinc-800">
                    <h1 className="text-2xl font-serif mb-6 text-center">Admin Login</h1>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-gray-400">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 bg-black border border-zinc-700 rounded focus:border-white outline-none transition-colors"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-2 text-gray-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-black border border-zinc-700 rounded focus:border-white outline-none transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif">Admin Dashboard</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-serif mb-4">Upload Image</h2>
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleUpload}
                            className="bg-zinc-900 p-8 rounded-lg border border-zinc-800"
                        >
                            <div className="mb-6">
                                <label className="block text-sm mb-2 text-gray-400">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full p-2 bg-black border border-zinc-700 rounded focus:border-white outline-none transition-colors"
                                >
                                    <option value="wedding">Wedding Photography</option>
                                    <option value="event">Event Photography</option>
                                    <option value="portrait">Portrait Session</option>
                                    <option value="commercial">Commercial Shoot</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm mb-2 text-gray-400">Image</label>
                                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-500 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {file ? (
                                        <p className="text-white">{file.name}</p>
                                    ) : (
                                        <p className="text-gray-500">Click or drag to upload image</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !file}
                                className={`w-full py-3 rounded font-medium transition-colors ${uploading || !file
                                    ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                                    : "bg-white text-black hover:bg-gray-200"
                                    }`}
                            >
                                {uploading ? "Uploading..." : "Upload Image"}
                            </button>

                            {message && (
                                <p className={`mt-4 text-center ${message.includes("Error") ? "text-red-400" : "text-green-400"}`}>
                                    {message}
                                </p>
                            )}
                        </motion.form>
                    </div>

                    {/* Images List */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-serif mb-4">Uploaded Images</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {images.length === 0 ? (
                                <p className="text-gray-500">No images yet.</p>
                            ) : (
                                images.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`bg-zinc-900 p-4 rounded-lg border relative group flex gap-4 items-center ${covers[img.category] === img.url ? 'border-accent' : 'border-zinc-800'
                                            }`}
                                    >
                                        <div className="w-20 h-20 relative flex-shrink-0">
                                            <img src={img.url} alt={img.category} className="w-full h-full object-cover rounded" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate capitalize">{img.category}</p>
                                            <p className="text-xs text-gray-500">{new Date(img.created_at).toLocaleDateString()}</p>
                                            {covers[img.category] === img.url && (
                                                <span className="text-xs text-accent mt-1 inline-block">Current Cover</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => setAsCover(img.url, img.category)}
                                                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded transition-colors"
                                            >
                                                Set Cover
                                            </button>
                                            <button
                                                onClick={() => deleteImage(img.id, img.url)}
                                                className="text-gray-500 hover:text-red-500 transition-colors p-1 self-end"
                                                title="Delete Image"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-serif mb-4">Messages</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {messages.length === 0 ? (
                                <p className="text-gray-500">No messages yet.</p>
                            ) : (
                                messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 relative group"
                                    >
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                            title="Delete Message"
                                        >
                                            ✕
                                        </button>
                                        <div className="flex justify-between items-start mb-2 pr-8">
                                            <h3 className="font-bold text-lg">{msg.subject}</h3>
                                            <span className="text-xs text-gray-500">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-1">From: <span className="text-white">{msg.name}</span></p>
                                        <p className="text-sm text-gray-400 mb-4">Email: <a href={`mailto:${msg.email}`} className="text-accent hover:underline">{msg.email}</a></p>
                                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{msg.message}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
