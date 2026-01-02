import { LucideIcon } from "lucide-react";

import Image from "next/image";

interface ServiceCardProps {
    title: string;
    description: string;
    Icon: LucideIcon;
    image: string;
}

export default function ServiceCard({ title, description, Icon, image }: ServiceCardProps) {
    return (
        <div className="bg-muted/70 border border-white/10 overflow-hidden group hover:border-accent transition-all duration-300 shadow-sm">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <Icon className="w-8 h-8 text-accent" />
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-serif font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
            </div>
        </div>
    );
}
