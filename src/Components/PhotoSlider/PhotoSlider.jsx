import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { posters as banners } from '../../assets/banners/banners.js';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PhotoSlider = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageErrors, setImageErrors] = useState(new Set());
  
  // Get the latest banners
  const latestBanners = banners.slice().reverse().slice(0, Math.min(5, banners.length));

  // Preload images for better performance
  useEffect(() => {
    latestBanners.forEach((banner) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, banner.id]));
      };
      img.onerror = () => {
        setImageErrors(prev => new Set([...prev, banner.id]));
      };
      img.src = banner.image;
    });
  }, [latestBanners]);

  const handleImageLoad = (bannerId) => {
    setLoadedImages(prev => new Set([...prev, bannerId]));
  };

  const handleImageError = (bannerId) => {
    setImageErrors(prev => new Set([...prev, bannerId]));
  };

  return (
    <section className="photo-slider w-full" role="region" aria-label="Latest banner images">
      <style>{`
        .photo-slider .swiper-button-next,
        .photo-slider .swiper-button-prev {
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 50% !important;
          width: 45px !important;
          height: 45px !important;
          margin-top: -22.5px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .photo-slider .swiper-button-next:hover,
        .photo-slider .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
          transform: scale(1.05) !important;
        }
        
        .photo-slider .swiper-button-next:after,
        .photo-slider .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold !important;
          color: #333 !important;
        }

        .photo-slider .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7) !important;
          opacity: 0.7 !important;
          transition: all 0.2s ease !important;
        }

        .photo-slider .swiper-pagination-bullet-active {
          background: #fff !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }

        @media (max-width: 640px) {
          .photo-slider .swiper-button-next,
          .photo-slider .swiper-button-prev {
            width: 35px !important;
            height: 35px !important;
            margin-top: -17.5px !important;
          }
          
          .photo-slider .swiper-button-next:after,
          .photo-slider .swiper-button-prev:after {
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .photo-slider .swiper-button-next,
          .photo-slider .swiper-button-prev {
            width: 30px !important;
            height: 30px !important;
            margin-top: -15px !important;
          }
          
          .photo-slider .swiper-button-next:after,
          .photo-slider .swiper-button-prev:after {
            font-size: 12px !important;
          }
        }
      `}</style>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={latestBanners.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-auto"
        preloadImages={false}
        watchSlidesProgress={true}
      >
        {latestBanners.length > 0 ? latestBanners.map((banner) => (
          <SwiperSlide key={banner.id} className="flex justify-center items-center">
            <figure className="w-full h-[45vw] relative bg-gray-100 rounded-lg overflow-hidden">
              {!loadedImages.has(banner.id) && !imageErrors.has(banner.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {imageErrors.has(banner.id) ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p>Image not available</p>
                  </div>
                </div>
              ) : (
                <img
                  src={banner.image}
                  alt={`Banner image ${banner.id}`}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages.has(banner.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(banner.id)}
                  onError={() => handleImageError(banner.id)}
                  fetchpriority="high"
                  decoding="async"
                />
              )}
            </figure>
          </SwiperSlide>
        )) : (
          <SwiperSlide className="flex justify-center items-center">
            <div className="w-full h-[20vw] max-h-[400px] min-h-[250px] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No banners available</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default PhotoSlider;
