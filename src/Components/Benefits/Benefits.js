import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';

import { FaSyncAlt, FaShuttleVan, FaRegCreditCard, FaArrowRight } from "react-icons/fa"
import { MdOutlineSupportAgent } from "react-icons/md";

import "./benefit.css"


const Benefits = () => {
    return <>
        <div className='container-fluid main_container mb-5' id='benefit'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-5'>
                    <div className='my-4 text-center'>
                        <h1 className='fw-bolder home_heading text-capitalize' style={{ color: "" }}>100% Satisfaction is Guaranteed</h1>
                        <p >Over 10,000 Happy Customers!</p>
                    </div>
                    <div className='benefit_main_box mt-5 px-lg-5 px-sm-0 gap-5'>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><FaSyncAlt /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", }}>12 Months Warranty</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>The Most of the U.K</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><FaRegCreditCard /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", }}>Flexible Payments</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>100% Secure Payments</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><FaShuttleVan /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", }}>Fast Delivery</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>Delivery in as little as 5-7  days</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div className='benefit_icon'><MdOutlineSupportAgent /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", }}>Customer Support</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>24/7 Customer Support Available</p></div>
                        </div>
                    </div>

                    <Swiper
                        className="mb-5 mySwiper benefit_main_box_swiper"
                        slidesPerView={2}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false
                        }}
                    >

                        <SwiperSlide>
                            <div className='benefit_box'>
                                <div className='benefit_icon'><FaSyncAlt /></div>
                                <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>12 Months Warranty</p></div>
                                <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>The Most of the U.K</p></div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='benefit_box'>
                                <div className='benefit_icon'><FaRegCreditCard /></div>
                                <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Flexible Payments</p></div>
                                <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>100% Secure Payments</p></div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='benefit_box'>
                                <div className='benefit_icon'><FaShuttleVan /></div>
                                <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Fast Delivery</p></div>
                                <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>Delivery in as little as 5-7  days</p></div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='benefit_box'>
                                <div className='benefit_icon'><MdOutlineSupportAgent /></div>
                                <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Customer Support</p></div>
                                <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px", color: "black" }}>24/7 Customer Support</p></div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div className='col-lg-12 my-5 d-flex justify-content-center'>
                    <a href="/Products/all">
                        <button className='button-submit px-5'>Browse Our Products</button>
                    </a>
                </div>

            </div>
        </div>
    </>
}

export default Benefits