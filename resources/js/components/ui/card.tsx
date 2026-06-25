type CardProps = {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className={`rounded-lg border bg-white p-4`}>
            {children}
        </div>
    );
}
