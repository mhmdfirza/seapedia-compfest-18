type AvatarProps = {
    src: string;
    alt?: string;
    size?: number;
};

export default function Avatar({
    src,
    alt = "Avatar",
    size = 48,
}: AvatarProps) {
    return (
        <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full object-cover"
        />
    );
}