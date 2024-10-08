import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useForm } from 'react-hook-form';
import { FaVideoSlash } from "react-icons/fa";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { toast } from 'react-toastify';
import Loader from "../Loader/Loader"
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import "./review.css"
import { useNavigate } from 'react-router-dom';
const Review = () => {


    let {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    let cu = useSelector((store) => store.userSection.cu);
    const [formData, setFormData] = useState(new FormData());
    const allComments = useSelector((store) => store.Comment.comment);

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(false)

    const dispatch = useDispatch();

    const openForm = () => {
        setForm(!form)
    }

    const Comment = async (cmnt) => {
        console.log("comment working");
        setLoading(true);

        let mediaUrl = "";

        if (cmnt.image && cmnt.image[0] && cmnt.video && cmnt.video[0]) {
            setLoading(false);
            return toast.warning("Select each media");
        }

        if (cmnt.image && cmnt.image[0]) {
            const imageType = cmnt.image[0].type;

            if (!imageType.startsWith("image/")) {
                setLoading(false);
                return toast.warning("Select valid image file");
            }

            const formData = new FormData();
            formData.append('file', cmnt.image[0]);
            formData.append('upload_preset', 'zonfnjjo');
            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/image/upload", formData);
                mediaUrl = response.data.url;
                // console.log("Image uploaded successfully");
            } catch (error) {
                // console.error("Image upload failed", error);
            }
        }

        if (cmnt.video && cmnt.video[0]) {
            const videoType = cmnt.video[0].type;


            if (!videoType.startsWith("video/")) {
                setLoading(false);
                return toast.warning("Select valid video format");
            }
            const formData = new FormData();
            formData.append('file', cmnt.video[0]);
            formData.append('upload_preset', 'zonfnjjo');
            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/video/upload", formData);
                mediaUrl = response.data.url;
                // console.log("Video uploaded successfully");
            } catch (error) {
                // console.error("Video upload failed", error);
            }
        }

        try {
            cmnt.mediaUrl = mediaUrl;
            cmnt.userID = cu._id;
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, cmnt);

            if (response.data.message === "Comment Added") {
                dispatch({
                    type: "ADD_COMMENT",
                    payload: response.data.alldata,
                });
                setComments(response.data.alldata);
                setLoading(false);
                setForm(false)
                window.location.reload();
                reset();
                toast.success("Feedback submitted");
            }
        } catch (e) {
            //   console.error("Comment submission failed", e);
        }
    };



    useEffect(() => {
        setLoading(true);
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
                if (res) {
                    dispatch({ type: "ADD_COMMENT", payload: res.data });
                    setLoading(false)
                }
            });
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        if (allComments) {
            setComments(allComments);
            setLoading(false);
        }
    }, [allComments]);



    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    return <>
        <div className='container-fluid my-5' style={{ backgroundColor: "#F2F0F1" }}>
            <div className='container'>
                <div className="row d-flex justify-content-center">

                    <div className="col-lg-12 col-md-12 col-sm-12 my-5">
                        <h1 className="fs-1 fw-bolder my-5">
                            Riski-Brothers Society
                        </h1>
                        {/* <p className=fs-6'>Over 10,000 happy customers!</p> */}

                        <div className='h_box_main'>
                            {loading ? (
                                <div
                                    className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                                    style={{ height: "80vh" }}
                                >
                                    <Loader />
                                </div>
                            ) : comments?.length === 0 ? (
                                <div
                                    className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                                    style={{ height: "50vh" }}
                                >
                                    <h2>No Review available</h2>
                                </div>
                            ) : (comments?.map((item, index) => {
                                return <>
                                    <div className='card border p-2' style={{ width: "270px" }} key={index}>
                                        <div className="card_img mb-2" style={{ background: "transparent" }}>
                                            {item?.mediaUrl === undefined && (
                                                <img src="/feedback.png" alt={item.title} style={{ maxWidth: '100%', height: '95%' }} />
                                            )
                                            }
                                            {item?.mediaUrl && (
                                                <>
                                                    {item?.mediaUrl.endsWith('.jpg') || item?.mediaUrl.endsWith('.png') ? (
                                                        <img src={item?.mediaUrl} alt={item.title} style={{ maxWidth: '100%', height: '95%' }} />
                                                    ) : (
                                                        <video controls autoPlay style={{ maxWidth: '100%', maxHeight: '95%' }}>
                                                            <source src={item?.mediaUrl} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <p className='text-center'>{item?.comment}</p>
                                        <p className='text-center fw-bolder'>{item?.name}</p>
                                    </div>
                                </>
                            })
                            )}
                        </div>
                    </div>

                    {!form && (
                        <div className="col-12 p-2" style={{ backgroundColor: "#F2F0F1" }}>
                            <div className="border py-5 px-lg-5 px-md-3 px-sm-2 d-flex flex-column justify-content-center align-items-center">
                                <p className="fw-bolder fs-3 text-center">Customer Reviews</p>
                                <p className="text-center fs-5">No review yet. Any feedback? Let us know </p>
                                <div className="">
                                    <button className="button-submit px-3"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >Write a review</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <div className='min-vh-50 d-flex justify-content-center align-items-center'>
                            <Loader />

                        </div>
                    ) : (
                        <div
                            className="modal fade review_model"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                                            Reviews
                                        </h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body p-3">
                                        <form action="" onSubmit={handleSubmit(Comment)}>
                                            <div className="mb-3">
                                                <label className="form-label">Your Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Rose Merie"
                                                    defaultValue={cu?.name}
                                                    required
                                                    {...register('name')}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Email address</label>
                                                <input
                                                    type="email"
                                                    placeholder="asd@gmail.com"
                                                    className="form-control"
                                                    defaultValue={cu?.email}
                                                    required
                                                    {...register('email')}
                                                />
                                            </div>

                                            <div className="d-flex gap-2 mb-3">
                                                {/* Image input */}
                                                <div className="file-input-container">
                                                    <label className="file-input-box">
                                                        <i><MdOutlinePhotoLibrary /></i>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            {...register('image')}
                                                            className="file-input"
                                                        />
                                                        <p className="text-muted m-0">Photo</p>
                                                    </label>
                                                </div>

                                                {/* Video input */}
                                                <div className="file-input-container">
                                                    <label className="file-input-box">
                                                        <i><FaVideoSlash /></i>
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            {...register('video')}
                                                            className="file-input"
                                                        />
                                                        <p className="text-muted m-0">Video</p>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Write your feedback</label>
                                                <textarea
                                                    rows="5"
                                                    className="form-control"
                                                    required
                                                    {...register('comment')}
                                                />
                                            </div>
                                            <button type="submit" className="button-submit w-100">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    </>
}

export default Review