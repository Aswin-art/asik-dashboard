"use client";

import { Brain } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface SlideImage {
  src: string;
  title?: string;
  title2?: string;
  alt?: string;
}

interface PsychologistSlideshowProps {
  images: SlideImage[];
  autoplayDelay?: number;
  className?: string;
}

export function PsychologistSlideshow({ images, autoplayDelay = 5000, className = "" }: PsychologistSlideshowProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isHovered ? "grab" : "default" }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={true}
        centeredSlidesBounds={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={images.length > 1}
        speed={800}
        grabCursor={true}
        className="psychologist-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image.src}-${index}`} className="custom-swiper-slide">
            <div className="swiper-slide-content group bg-muted relative aspect-[21/9] w-full overflow-hidden rounded-3xl transition-all duration-700">
              {failedImages.has(image.src) ? (
                <div className="from-muted to-muted/50 flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br p-8 text-center">
                  <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                    <Brain className="text-primary h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground text-lg font-semibold">Image not available</p>
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt || image.title || `Slide ${index + 1}`}
                    fill
                    quality={90}
                    loading={index < 3 ? "eager" : "lazy"}
                    onError={() => handleImageError(image.src)}
                    className="object-cover object-center brightness-75 transition-transform duration-700"
                    sizes="(max-width: 768px) 95vw, 85vw"
                  />

                  <div className="absolute right-4 bottom-4 flex flex-col items-end gap-3">
                    {image.title && (
                      <div className="rounded-full border-2 border-white bg-black/10 px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-300">
                        <p className="text-sm font-semibold text-white">{image.title}</p>
                      </div>
                    )}

                    {image.title2 && (
                      <div className="rounded-full border-2 border-white bg-black/10 px-6 py-3 shadow-lg backdrop-blur-md transition-all duration-300">
                        <p className="text-sm font-semibold text-white">{image.title2}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent transition-all duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Container Swiper */
        .psychologist-swiper {
          padding: 2rem 0 4rem;
          width: 100%;
          max-width: 100vw;
          overflow: visible; /* biar peek kanan-kiri & shadow keliatan */
        }
        .psychologist-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          align-items: center;
        }

        /* === SLIDE WIDTH KONSTAN (JANGAN DI-SCALE DI SINI) === */
        .psychologist-swiper .custom-swiper-slide {
          width: 80vw;
          max-width: 1400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* === EFEK VISUAL PINDAH KE KONTEN DI DALAM SLIDE === */
        .psychologist-swiper .swiper-slide-content {
          margin: 0 auto;
          transition:
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.6s;
          transform-origin: center center;
          /* state default utk non-active */
          transform: scale(0.88);
          opacity: 0.5;
        }

        .psychologist-swiper .swiper-slide-active .swiper-slide-content {
          transform: scale(1);
          opacity: 1;
          box-shadow: 0 25px 25px -15px rgba(0, 0, 0, 0.35);
        }

        /* Pagination */
        .psychologist-swiper .swiper-pagination {
          bottom: 0;
        }
        .psychologist-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: hsl(var(--muted-foreground));
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .psychologist-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          opacity: 1;
          transform: scale(1.3);
        }

        /* Responsif */
        @media (max-width: 1024px) {
          .psychologist-swiper .custom-swiper-slide {
            width: 80vw;
          }
        }
        @media (max-width: 768px) {
          .psychologist-swiper {
            padding: 1.5rem 0 3rem;
          }
          .psychologist-swiper .custom-swiper-slide {
            width: 75vw;
          }
          .psychologist-swiper .swiper-slide-content {
            transform: scale(0.94);
          }
          .psychologist-swiper .swiper-slide-active .swiper-slide-content {
            transform: scale(0.98);
          }
        }
        @media (max-width: 640px) {
          .psychologist-swiper {
            padding: 1rem 0 2.5rem;
          }
          .psychologist-swiper .custom-swiper-slide {
            width: 95vw;
          }
          .psychologist-swiper .swiper-slide-content {
            transform: scale(0.96);
          }
          .psychologist-swiper .swiper-slide-active .swiper-slide-content {
            transform: scale(0.985);
          }
        }
      `}</style>
    </div>
  );
}
