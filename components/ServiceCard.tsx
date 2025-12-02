import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    Icon: LucideIcon;
}

export default function ServiceCard({ title, description, price, Icon }: ServiceCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 p-8 hover:border-accent transition-colors duration-300 group">
            <div className="mb-6">
                <Icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
            <p className="text-accent text-xl font-bold tracking-widest">{price}</p>
        </div>
    );
}
