type BreadcrumbProps = {
    items: string[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <div className="flex gap-2 text-gray-500">
            {items.map((item, i) => (
                <span key={i}>
                    {item}
                    {i < items.length - 1 && " / "}
                </span>
            ))}
        </div>
    );
}