import { LucideIcon } from "lucide-react";

type SocialIconProps = {
    icon: LucideIcon;
    href: string;
};

export default function SocialIcon({
    icon: Icon,
    href,
}: SocialIconProps) {
    return (
        <a
            href={href}
            className="text-gray-500 hover:text-blue-600"
        >
            <Icon size={20} />
        </a>
    );
}