import React, { useEffect, useState } from 'react';

type ToastProps = {
    message: string;
    show: boolean;
    onClose: () => void;
    duration?: number;
};

export default function Toast({ message, show, onClose, duration = 3000 }: ToastProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show && !visible) return null;

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-neutral-dark text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{message}</span>
            </div>
        </div>
    );
}
