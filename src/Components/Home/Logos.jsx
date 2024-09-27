import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';

import "./logos.css"

const Logos = () => {
  return (
    <>
      <div className='container-fluid bg-dark'>
        <div className='row'>
          <div className='col'>
            <div className='d-flex flex-wrap justify-content-center align-items-center py-1'>
              <Swiper
                className="mySwiper"
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{ 
                  delay: 3000,  
                  disableOnInteraction: false 
                }}
              >

                <SwiperSlide><p className="m-0 fs-5">30% Off</p></SwiperSlide>
                <SwiperSlide><p className="m-0 fs-5">Free Home Delivery</p></SwiperSlide>
                <SwiperSlide><p className="m-0 fs-5">Bumper Winter Offer</p></SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logos;
