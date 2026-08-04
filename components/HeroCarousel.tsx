"use client";

import { useState, useEffect, useCallback } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const slides = [
    { id: 1, image: "https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg", alt: "Featured 1" },
    { id: 2, image: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg", alt: "Featured 2" },
    { id: 3, image: "https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg", alt: "Featured 3" },
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);
    const count = slides.length;

    const goTo = useCallback((i: number) => {
        setIndex((i + count) % count);
    }, [count]);

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (count <= 1) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next, count]);

    if (count === 0) return null;

    return (
        <div
            className="position-relative overflow-hidden rounded-3 mb-4"
            style={{ height: 380 }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured products"
        >

            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        opacity: i === index ? 1 : 0,
                        transition: "opacity 0.6s ease-in-out",
                        pointerEvents: i === index ? "auto" : "none",
                    }}
                    aria-hidden={i !== index}
                >
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            ))}

            {count > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous slide"
                        className="btn position-absolute top-50 start-0 translate-middle-y ms-2"
                        style={{ zIndex: 5, background: "rgba(255,255,255,0.6)" }}
                    >
                        <KeyboardArrowLeft />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next slide"
                        className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                        style={{ zIndex: 5, background: "rgba(255,255,255,0.6)" }}
                    >
                        <KeyboardArrowRight />
                    </button>

                    {/* Dot indicators */}
                    <div
                        className="position-absolute start-50 translate-middle-x d-flex gap-2"
                        style={{ bottom: 16, zIndex: 5 }}
                    >
                        {slides.map((slide, i) => (
                            <button
                                key={slide.id}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index}
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}