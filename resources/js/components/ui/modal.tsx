type ModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
};

export default function Modal({
    isOpen,
    children,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="rounded-xl bg-white p-6 shadow-xl">
                {children}
            </div>
        </div>
    );
}