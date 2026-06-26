import React, { useState } from 'react';
import Modal from 'res/components/ui/modal';
import Button from 'res/components/ui/button';

const RATING_LABELS: Record<number, string> = {
    1: 'Sangat Buruk',
    2: 'Buruk',
    3: 'Cukup',
    4: 'Bagus',
    5: 'Sangat Bagus',
};

type ReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; rating: number; comment: string }) => void;
};

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = 'Nama wajib diisi';
        if (!rating) errs.rating = 'Rating wajib dipilih';
        if (comment.trim().length < 20) errs.comment = 'Komentar minimal 20 karakter';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ name: name.trim(), rating, comment: comment.trim() });
        setName('');
        setRating(0);
        setComment('');
        setErrors({});
    };

    const displayRating = hoverRating || rating;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="font-display text-xl font-bold text-neutral-dark mb-1">Tulis Ulasan untuk SEAPEDIA</h2>
                <p className="text-sm text-neutral-medium mb-5">Ceritakan pengalamanmu menggunakan SEAPEDIA</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-1.5">Nama</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nama kamu"
                            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${errors.name ? 'border-danger focus:ring-danger/30' : 'border-border focus:ring-primary/30 focus:border-primary'}`}
                        />
                        {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
                    </div>

                    {/* Rating Stars */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-1.5">Rating</label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                                >
                                    {star <= displayRating ? '⭐' : '☆'}
                                </button>
                            ))}
                            {displayRating > 0 && (
                                <span className={`text-sm font-medium ml-2 ${displayRating >= 4 ? 'text-primary' : displayRating >= 3 ? 'text-amber-500' : 'text-danger'}`}>
                                    {RATING_LABELS[displayRating]}
                                </span>
                            )}
                        </div>
                        {errors.rating && <p className="text-xs text-danger mt-1">{errors.rating}</p>}
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-1.5">Komentar</label>
                        <div className="relative">
                            <textarea
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Ceritakan pengalamanmu..."
                                rows={4}
                                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none transition-colors ${errors.comment ? 'border-danger focus:ring-danger/30' : 'border-border focus:ring-primary/30 focus:border-primary'}`}
                            />
                            <span className={`absolute bottom-2 right-3 text-[10px] ${comment.length < 20 ? 'text-neutral-medium' : 'text-primary'}`}>
                                {comment.length}/20 min
                            </span>
                        </div>
                        {errors.comment && <p className="text-xs text-danger mt-1">{errors.comment}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button type="submit" size="md" className="flex-1 justify-center">
                            Kirim Ulasan
                        </Button>
                        <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1 justify-center">
                            Batal
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
