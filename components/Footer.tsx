import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-2">24_pupilz</h3>
                        <p className="text-gray-500 text-sm">
                            Capturing moments, creating memories.
                        </p>
                    </div>

                    <div className="flex justify-center gap-6">
                        <a href="https://www.instagram.com/24_pupilz__photography/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-accent transition-colors">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="mailto:contact@24pupilz.com" className="hover:text-accent transition-colors">
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>

                    <div className="text-center md:text-right text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} 24_pupilz Photography.</p>
                        <p>All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
