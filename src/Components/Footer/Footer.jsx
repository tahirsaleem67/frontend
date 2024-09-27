import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./footer.css"
import { NavLink } from 'react-router-dom';

const Footer = () => {


    const sendWhatsAppMessage = () => {
        const message = `How can we help you?`;
        const whatsappURL = `https://wa.me/+923259053922?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };

    return <>
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start" style={{ backgroundColor: "#F0EEED" }} >
                {/* Section: Social media */}
                <section className="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block fw-bold">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div className='fs-4'>
                        <a href="https://www.facebook.com/share/55R2hTjgvaqV8Wky/?mibextid=qi2Omg" target='blank' className="me-4 text-reset">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/riski.brothers?igsh=MXdseXcwMzIxazZuMg==" target='blank' className="me-4 text-reset">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/riski.brothers?igsh=MXdseXcwMzIxazZuMg==" target='blank' className="me-4 text-reset">
                            <FaInstagram />
                        </a>
                        <a onClick={sendWhatsAppMessage} className="me-4 text-reset">
                            <FaWhatsapp />
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className="">
                    <div className="container  text-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <img src="logo.png" alt="" />
                                <p className='mt-3'>
                                    We have clothes that suits your style and which you’re proud to wear.
                                    From women to men.
                                </p>
                            </div>
                            <div className="col-md-5 col-lg-5 col-xl-5 col-sm-12 mx-auto mb-4
                             footer_div">
                                <div>
                                    <h6 className="text-uppercase fw-bolder mb-4">Information</h6>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Shop Now
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Reviews
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            New Arrival
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Top Selling
                                        </a>
                                    </p>
                                </div>
                                <div className="">
                                    <div>
                                        <h6 className="text-uppercase fw-bolder mb-4">Useful links</h6>
                                        <p>
                                            <NavLink to="products" className="text-reset">
                                                Products
                                            </NavLink>
                                        </p>
                                        <p>
                                            <NavLink to="products" className="text-reset">
                                                Special Offers
                                            </NavLink>
                                        </p>
                                        <p>
                                            <NavLink to="contact" className="text-reset">
                                                Contact
                                            </NavLink>
                                        </p>
                                        <p>
                                            <NavLink to="/faqs" className="text-reset">
                                                FAQ's
                                            </NavLink>
                                        </p>
                                    </div>

                                </div>

                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bolder mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home " /> Back side CUST University sihala Islamabad
                                </p>
                                <a href="mailto:riskibrothers00@gmail.com" target='_blank'>
                                    <p>
                                        <i className="fas fa-envelope" /> riskibrothers00@gmail.com
                                    </p>
                                </a>
                                <a href="tel:+923259053922">
                                    <p>
                                        <i className="fas fa-phone" /> +923259053922
                                    </p>
                                </a>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    © 2024 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
                        Excellence Institute
                    </a>
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </>

    </>
}

export default Footer