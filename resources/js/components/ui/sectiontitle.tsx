type SectionTitleProps = {
    title: string;
    subtitle?: string;
};

export default function SectionTitle({
    title,
    subtitle,
}: SectionTitleProps) {
    return (
        <div className="space-y-2 text-center">
            <h2 className="text-4xl font-bold">
                {title}
            </h2>

            {subtitle && (
                <p className="text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}