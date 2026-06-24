type LogoProps = {
    name?: string;
};

export default function Logo({
    name = "SeaPedia",
}: LogoProps) {
    return (
        <h1 className="text-2xl font-bold text-blue-600">
            {name}
        </h1>
    );
}