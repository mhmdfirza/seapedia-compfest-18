import React, { useState } from 'react';
import { useReviews } from 'res/contexts/reviewcontext';
import Container from 'res/components/ui/container';
import SectionTitle from 'res/components/ui/sectiontitle';
import Button from 'res/components/ui/button';
import ReviewModal from 'res/components/sections/reviewmodal';
import Toast from 'res/components/ui/toast';

export default function ReviewSection() {
    const { reviews, addReview, averageRating } = useReviews();
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (data: { name: string; rating: number; comment: string }) => {
        addReview(data);
        setShowModal(false);
        setShowToast(true);
    };

    return (
        <section className="py-12 bg-white">
            <Container>
                <SectionTitle
                    title="⭐ Ulasan Pengguna SEAPEDIA"
                    subtitle="Apa kata mereka yang sudah berbelanja di SEAPEDIA"
                    align="center"
                    className="mb-2 justify-center"
                />

                {/* Average Rating Display */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-primary-light rounded-full px-5 py-2.5">
                        <span className="text-3xl font-bold text-neutral-dark font-display">{averageRating}</span>
                        <span className="text-2xl">⭐</span>
                    </div>
                    <span className="text-sm text-neutral-medium">dari {reviews.length} ulasan</span>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {reviews.slice(0, 6).map((review) => (
                        <div key={review.id}
                            className="bg-neutral-light rounded-xl border border-border p-5 hover:border-primary hover:shadow-md transition-all duration-200">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-full ${review.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                                    {review.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-neutral-dark truncate">{review.name}</p>
                                    <p className="text-xs text-neutral-medium">{review.date}</p>
                                </div>
                            </div>
                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mb-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                ))}
                            </div>
                            {/* Comment */}
                            <p className="text-sm text-neutral-medium leading-relaxed line-clamp-3">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button size="lg" onClick={() => setShowModal(true)} className="px-8">
                        ✍️ Tulis Ulasanmu
                    </Button>
                </div>
            </Container>

            <ReviewModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
            <Toast message="Ulasan berhasil dikirim! Terima kasih 🎉" show={showToast} onClose={() => setShowToast(false)} />
        </section>
    );
}