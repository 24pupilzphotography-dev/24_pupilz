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
    const [coverTarget, setCoverTarget] = useState<string>("wedding");
    const [coverSearch, setCoverSearch] = useState<string>("");

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
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md rounded-2xl border border-white/10 bg-muted/70 backdrop-blur-md shadow-2xl p-8"
                >
                    <h1 className="text-2xl font-serif mb-2 text-center">Admin Login</h1>
                    <p className="text-center text-sm text-muted-foreground mb-8">
                        Manage uploads, covers, and messages.
                    </p>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-muted-foreground">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-background/40 border border-white/10 focus:border-accent outline-none transition-colors"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-2 text-muted-foreground">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-background/40 border border-white/10 focus:border-accent outline-none transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    const coverTargets = [
        { id: "hero", label: "Hero (fallback cover)" },
        { id: "behind_lens", label: "About (Behind the Lens)" },
        { id: "wedding", label: "Gallery: Wedding" },
        { id: "Baby Shower", label: "Gallery: Baby Shower" },
        { id: "Puberty Ceremony", label: "Gallery: Puberty Ceremony" },
        { id: "commercial", label: "Gallery: Photoshoot" },
    ];

    const uploadCategories = [
        { id: "wedding", label: "Wedding Photography" },
        { id: "Baby Shower", label: "Baby Shower" },
        { id: "Puberty Ceremony", label: "Puberty Ceremony" },
        { id: "commercial", label: "Photoshoot" },
        { id: "behind_lens", label: "Behind the Lens (About)" },
        { id: "event", label: "Event (extra)" },
    ];

    const normalizedSearch = coverSearch.trim().toLowerCase();
    const coverCandidateImages = images
        .filter((img) => coverTarget === "hero" || img.category === coverTarget)
        .filter((img) => {
            if (!normalizedSearch) return true;
            const haystack = `${img.category} ${img.created_at}`.toLowerCase();
            return haystack.includes(normalizedSearch);
        });

    return (
        <div className="min-h-screen bg-background text-foreground px-4 pt-24 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Upload images, set covers for sections, and manage contact messages.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors self-start md:self-auto"
                    >
                        Logout
                    </button>
                </div>

                {/* STEP 1: Covers (primary task) */}
                <div className="rounded-2xl border border-white/10 bg-muted/50 backdrop-blur-md p-6 mb-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-xl font-serif">1) Change a Cover</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Pick the section, then click an image. That’s it.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={coverTarget}
                                onChange={(e) => {
                                    setCoverTarget(e.target.value);
                                    setCoverSearch("");
                                }}
                                className="px-4 py-3 rounded-lg bg-background/40 border border-white/10 focus:border-accent outline-none"
                            >
                                {coverTargets.map((t) => (
                                    <option key={t.id} value={t.id}>{t.label}</option>
                                ))}
                            </select>
                            <input
                                value={coverSearch}
                                onChange={(e) => setCoverSearch(e.target.value)}
                                placeholder="Search (optional)"
                                className="px-4 py-3 rounded-lg bg-background/40 border border-white/10 focus:border-accent outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Current cover preview */}
                        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-background/25 overflow-hidden">
                            <div className="aspect-[16/9] bg-background/30">
                                {covers[coverTarget] ? (
                                    <img src={covers[coverTarget]} alt="Current cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                                        No cover set yet
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground">Current cover for</p>
                                <p className="font-medium">
                                    {coverTargets.find((t) => t.id === coverTarget)?.label ?? coverTarget}
                                </p>
                            </div>
                        </div>

                        {/* Pick an image */}
                        <div className="lg:col-span-3">
                            <p className="text-sm text-muted-foreground mb-3">
                                Choose from: <span className="text-foreground font-medium">
                                    {coverTarget === "hero" ? "All images" : `"${coverTarget}" images`}
                                </span>
                            </p>

                            {coverCandidateImages.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-background/25 p-6 text-muted-foreground">
                                    No images found. Upload an image in step 2.
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
                                    {coverCandidateImages.slice(0, 60).map((img) => (
                                        <button
                                            key={img.id}
                                            type="button"
                                            onClick={() => setAsCover(img.url, coverTarget)}
                                            className={`group text-left rounded-xl overflow-hidden border transition-colors ${covers[coverTarget] === img.url ? "border-accent" : "border-white/10 hover:border-white/20"
                                                }`}
                                            title="Click to set as cover"
                                        >
                                            <div className="aspect-[16/9] bg-background/30 relative">
                                                <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                                                    <span className="text-[11px] px-2 py-1 rounded-full bg-black/60 text-white/90 truncate">
                                                        {img.category}
                                                    </span>
                                                    {covers[coverTarget] === img.url && (
                                                        <span className="text-[11px] px-2 py-1 rounded-full bg-accent text-accent-foreground">
                                                            Active
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {coverCandidateImages.length > 60 && (
                                <p className="text-xs text-muted-foreground mt-3">
                                    Showing latest 60 images. Use search to narrow down.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* STEP 2: Upload (secondary task) */}
                <details className="rounded-2xl border border-white/10 bg-muted/50 backdrop-blur-md p-6 mb-8" open>
                    <summary className="cursor-pointer select-none list-none">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-serif">2) Upload New Images</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Upload first, then set it as cover in step 1.
                                </p>
                            </div>
                            <span className="text-sm text-muted-foreground">Open / Close</span>
                        </div>
                    </summary>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-white/10 bg-background/20 p-6">
                            <motion.form
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onSubmit={handleUpload}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm mb-2 text-muted-foreground">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-background/40 border border-white/10 focus:border-accent outline-none transition-colors"
                                    >
                                        {uploadCategories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm mb-2 text-muted-foreground">Image</label>
                                    <div className="relative rounded-xl border-2 border-dashed border-white/15 bg-background/25 p-8 text-center hover:border-white/25 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {file ? (
                                            <p className="text-foreground font-medium">{file.name}</p>
                                        ) : (
                                            <p className="text-muted-foreground">Click to upload (or drop an image)</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading || !file}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${uploading || !file
                                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                                        }`}
                                >
                                    {uploading ? "Uploading..." : "Upload Image"}
                                </button>

                                {message && (
                                    <p className={`text-center text-sm ${message.includes("Error") ? "text-red-400" : "text-green-400"}`}>
                                        {message}
                                    </p>
                                )}
                            </motion.form>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-background/20 p-6">
                            <h3 className="text-lg font-serif mb-2">Latest Uploads</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                After uploading, go to step 1 and pick it as a cover.
                            </p>
                            {images.length === 0 ? (
                                <p className="text-muted-foreground">No images yet.</p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {images.slice(0, 6).map((img) => (
                                        <div key={img.id} className="rounded-xl overflow-hidden border border-white/10 bg-background/25">
                                            <div className="aspect-[16/9]">
                                                <img src={img.url} alt={img.category} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-2">
                                                <p className="text-xs text-muted-foreground truncate">{img.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </details>

                {/* STEP 3: Messages (optional) */}
                <details className="rounded-2xl border border-white/10 bg-muted/50 backdrop-blur-md p-6">
                    <summary className="cursor-pointer select-none list-none">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-serif">3) Messages</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Optional: check contact form messages.
                                </p>
                            </div>
                            <span className="text-sm text-muted-foreground">Open / Close</span>
                        </div>
                    </summary>

                    <div className="mt-6">
                        {messages.length === 0 ? (
                            <p className="text-muted-foreground">No messages yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="rounded-xl border border-white/10 bg-background/25 p-5 relative">
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="absolute top-4 right-4 text-white/40 hover:text-red-400 transition-colors"
                                            title="Delete message"
                                        >
                                            ✕
                                        </button>

                                        <div className="flex items-start justify-between gap-4 pr-8">
                                            <h3 className="font-semibold text-lg">{msg.subject}</h3>
                                            <span className="text-xs text-muted-foreground mt-1">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="mt-3 text-sm text-muted-foreground space-y-1">
                                            <p>
                                                From: <span className="text-foreground">{msg.name}</span>
                                            </p>
                                            <p>
                                                Email:{" "}
                                                <a href={`mailto:${msg.email}`} className="text-accent hover:underline">
                                                    {msg.email}
                                                </a>
                                            </p>
                                        </div>

                                        <p className="mt-4 text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </details>
            </div>
        </div>
    );
}
