import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { posters as banners } from '../../assets/banners/banners.js';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PhotoSlider = () => {
  // Get the latest 5 banners (assuming they are ordered by id, get the highest ids)
  const latestBanners = banners.slice().reverse().slice(0, 5);

  return (
    <section className="photo-slider w-full" role="region" aria-label="Latest banner images">
      <style>{`
        .photo-slider .swiper-button-next,
        .photo-slider .swiper-button-prev {
          background-color: rgba(255, 255, 255, 0.9) !important;
          border-radius: 50% !important;
          width: 50px !important;
          height: 50px !important;
          margin-top: -25px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .photo-slider .swiper-button-next:hover,
        .photo-slider .swiper-button-prev:hover {
          background-color: rgba(255, 255, 255, 1) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
          transform: scale(1.1) !important;
        }
        
        .photo-slider .swiper-button-next:after,
        .photo-slider .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold !important;
          color: #333 !important;
        }

        /* Mobile styles - smaller navigation buttons */
        @media (max-width: 640px) {
          .photo-slider .swiper-button-next,
          .photo-slider .swiper-button-prev {
            width: 35px !important;
            height: 35px !important;
            margin-top: -17.5px !important;
          }
          
          .photo-slider .swiper-button-next:after,
          .photo-slider .swiper-button-prev:after {
            font-size: 12px !important;
          }
        }

        /* Extra small mobile - even smaller buttons */
        @media (max-width: 480px) {
          .photo-slider .swiper-button-next,
          .photo-slider .swiper-button-prev {
            width: 30px !important;
            height: 30px !important;
            margin-top: -15px !important;
          }
          
          .photo-slider .swiper-button-next:after,
          .photo-slider .swiper-button-prev:after {
            font-size: 10px !important;
          }
        }
      `}</style>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-auto"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }}
      >
        {latestBanners.map((banner) => (
          <SwiperSlide key={banner.id} className="flex justify-center items-center">
            <figure className="w-full h-[40vw]">
              <img
                src={banner.image}
                alt={`Banner image ${banner.id}`}
                className="w-full h-full object-cover shadow-lg"
                loading="lazy"
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PhotoSlider;
