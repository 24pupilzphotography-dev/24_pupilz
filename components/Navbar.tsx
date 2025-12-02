"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-center items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-[300px] aspect-[2.8/1] md:w-[450px]">
                        <Image
                            src="/logo%20web.png"
                            alt="24_pupilz Logo"
                            fill
                            className="object-contain transition-transform duration-300"
                        />
                    </div>
                </Link>
            </div>
        </nav>
    );
}
