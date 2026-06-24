type ProductCardProps = {
    image: string;
    title: string;
    price: number;
};

export default function ProductCard({
    image,
    title,
    price,
}: ProductCardProps) {
    return (
        <div className="rounded-xl border p-4 shadow">
            <img
                src={image}
                alt={title}
                className="h-48 w-full rounded-lg object-cover"
            />

            <h2 className="mt-4 text-lg font-semibold">
                {title}
            </h2>

            <p className="mt-2 text-blue-600 font-bold">
                Rp {price.toLocaleString()}
            </p>
        </div>
    );
}