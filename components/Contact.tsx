"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const { error } = await supabase
                .from('messages')
                .insert([formData]);

            if (error) throw error;

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h2>
                    <div className="w-24 h-1 bg-accent mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-serif font-bold mb-6">Let's Create Something Beautiful</h3>
                        <p className="text-muted-foreground mb-8">
                            Ready to book a session or have questions? Fill out the form or reach out directly.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-accent">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Phone</p>
                                    <p className="text-lg">6369409172</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-accent">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Email</p>
                                    <p className="text-lg">24pupilzphotography@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-accent">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Location</p>
                                    <p className="text-lg">Sathyamangalam, Erode</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-muted/70 backdrop-blur-sm p-8 border border-white/10 rounded-xl shadow-sm"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-background/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-background/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-muted-foreground mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-background/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                                    placeholder="Wedding Photography Inquiry"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-muted-foreground mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full bg-background/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-accent transition-colors rounded-lg"
                                    placeholder="Tell us about your event..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-accent text-accent-foreground font-bold py-4 uppercase tracking-widest hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                            </button>
                            {status === "success" && <p className="text-green-400 text-center">Message sent successfully!</p>}
                            {status === "error" && <p className="text-red-400 text-center">Failed to send message. Please try again.</p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
