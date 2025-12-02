"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-gray-50">
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
                        <p className="text-gray-600 mb-8">
                            Ready to book a session or have questions? Fill out the form or reach out directly.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full text-accent">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">Phone</p>
                                    <p className="text-lg">6369409172</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full text-accent">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">Email</p>
                                    <p className="text-lg">hello@24pupilz.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full text-accent">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">Location</p>
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
                        className="bg-white p-8 border border-gray-200 shadow-lg"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Subject</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black"
                                    placeholder="Wedding Photography Inquiry"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-accent transition-colors text-black"
                                    placeholder="Tell us about your event..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-accent text-white font-bold py-4 uppercase tracking-widest hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
