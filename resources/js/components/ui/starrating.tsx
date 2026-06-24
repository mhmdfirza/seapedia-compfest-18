type StarRatingProps = {
    rating: number;
};

export default function StarRating({
    rating,
}: StarRatingProps) {
    return (
        <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                    {star <= rating ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
}