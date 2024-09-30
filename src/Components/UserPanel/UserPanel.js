import React, { useEffect, useRef, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useDispatch } from "react-redux";
import userPanel from "../Animations/userPanel.json"
import axios from 'axios';
import "./userPanel.css"

const UserPanel = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const cu = useSelector((store) => store.userSection.cu);
    const navigate = useNavigate();
    const { userid } = useParams();
    const [order, setOrder] = useState([]);
    const [component, setComponent] = useState("orders");
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [arrivedVideo, setArrivedVideo] = useState([])
    const [isUploaded, setIsUploaded] = useState(false);
    const [passing, setPassing] = useState(false)
    /* User */

    useEffect(() => {
        const fetchVideoUrl = async () => {
            const token = localStorage.getItem("userToken");
            if (!token) return;
            const decoded = jwtDecode(token);
            const userId = decoded?.tokenId;
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getVideo/${userId}`);
                console.log(response.data, "images")
                setArrivedVideo(response.data);
            } catch (error) {
                // console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoUrl();
    }, [passing]);

    /* Video Testimonial */
    const [videoFile, setVideoFile] = useState(null);
    const [video, setVideo] = useState(null);
    const [recordedVideoURL, setRecordedVideoURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(URL.createObjectURL(file));
            setVideo(file);
        }
    };

    const startRecording = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("You need to be logged in to record a video.");
            navigate('/login');
            return;
        }

        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        let chunks = [];
        mediaRecorderRef.current.ondataavailable = (event) => {
            chunks.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/mp4' });
            setRecordedVideoURL(URL.createObjectURL(blob));
            setVideo(blob);
            chunks = [];
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handleUpload = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("You need to be logged in to upload a video.");
            navigate('/login'); // Navigate to the login page if not logged in
            return;
        }
        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "adeelrana");
        data.append("cloud_name", "dr3ie9gpz");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dr3ie9gpz/video/upload", data);
            const videoUrl = res.data.url;
            const decoded = jwtDecode(token);
            const userId = decoded?.tokenId;

            const backendResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-video`, {
                url: videoUrl,
                user: userId
            });

            setVideoUrl(backendResponse.data.url);
            setIsUploaded(true);
            setComponent('review')
            setRecordedVideoURL(null);
            setVideoFile(null);
            toast.success("Video Uploaded Successfully!");
            setPassing(!passing)
        } catch (error) {
            // console.error('Error uploading video:', error);
        }
    };

    const handleAddVideoClick = () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("You need to be logged in to add a video."); // Show toast message
            navigate('/login'); // Redirect to login if not logged in
        } else {
            document.getElementById("uploadVideo").click(); // Trigger file input click
        }
    };

    useEffect(() => {
        try {
            setIsLoading(true);
            axios.get(`${process.env.REACT_APP_BASE_URL}/order`).then((res) => {
                if (res.data) {
                    setOrder(res.data);
                    setIsLoading(false);
                }
            });
        } catch (e) {
        }
    }, []);

    const filterOrder = order.filter((item) => item.userId === cu._id);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    function Logout() {
        dispatch({
            type: "LOGOUT_USER",
        });
        navigate("/login");
    }

    return (
        <section style={{ backgroundColor: "#F2F0F1", minHeight: "100vh" }}>
            <div className="container py-5">
                <div className="row">

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img
                                    src="/profile.png"
                                    alt="avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: 150 }}
                                />
                                <h5 className="my-3">{cu.name}</h5>
                                <p className="text-muted mb-1">{cu.number}</p>
                                <p className="text-muted mb-4">{cu.email}</p>

                                <button type="button" className="button-submit px-5 ms-1 my-3" style={{ width: "100%" }} onClick={Logout}>
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className='col-lg-8 col-md-8 col-sm-12'>
                        <div className='d-flex justify-content-between mb-4'>
                            <button className={`profile_btn ${component === 'orders' ? 'button-submit px-4' : ''}`} onClick={() => setComponent('orders')}>My Orders</button>
                            <button className={`profile_btn ${component === 'review' ? 'button-submit px-4' : ''}`} onClick={() => setComponent('review')}>My Reviews</button>
                            <button className={`profile_btn ${component === 'feedback' ? 'button-submit px-4' : ''}`} onClick={() => setComponent('feedback')}>Give Feedback</button>
                        </div>
                        {component === "orders" &&
                            <>
                                {isLoading ? (
                                    <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                        <Loader />
                                    </div>
                                ) : filterOrder.length > 0 ? (
                                    <>
                                        <p className='fs-5 fw-bolder m-0' style={{ color: "#1b2950" }}>Orders : {filterOrder?.length}</p>
                                        <div className='row row-cols-lg-2 row-cols-md-3 row-cols-sm-2 px-3'>
                                            {filterOrder?.map((item, index) => {
                                                const orderItemsLength = item.orderItems.length;
                                                let totalFprice = 0;
                                                item.orderItems.forEach((data) => {
                                                    totalFprice += parseFloat(data?.total);
                                                });
                                                return <>
                                                    <div className='col my-2 p-3' key={index} style={{ backgroundColor: "white", position: "relative" }}>
                                                        <div className='row'>
                                                            <p className='panel_index'>{index + 1}</p>
                                                            <div className='col-4'>
                                                                <img src={item?.orderItems[0]?.image} style={{ maxHeight: '180px' }} className='rounded-3 img-fluid' alt="" />
                                                            </div>
                                                            <div className='col-8 ' style={{ position: "relative" }}>
                                                                <p className='m-0'>
                                                                    Tracking ID: {item?.orderId}
                                                                </p>
                                                                <p className='m-0'>
                                                                    Total: &pound;{item?.total?.toFixed()}
                                                                </p>
                                                                <p className='m-0'>
                                                                    Date: {formatDateTime(item?.date)}
                                                                </p>
                                                                <p className='m-0'>
                                                                    <a href={`/order-detail/${item?._id}`}>Detail</a>
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </>
                                            })}
                                        </div>


                                    </>
                                ) : (
                                    <div className='py-0 my-5 d-flex flex-column align-items-center justify-content-center gap-3' style={{ height: '50vh', backgroundColor: '#eee' }}>
                                        <p className='fw-bolder text-muted'>No Order Placed yet</p>
                                        <Lottie animationData={userPanel} loop={true} style={{ width: "100%", height: "100%" }} />
                                        <button className='button-submit px-5 py-3 w-100' onClick={() => navigate('/Products/all')}>
                                            Shop our products
                                        </button>
                                    </div>
                                )
                                }
                            </>
                        }

                        {component === "feedback" &&
                            <>
                                <div className="text-center my-3">
                                    <h2>Add or Record Video</h2>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                        id="uploadVideo"
                                        onChange={handleVideoChange}
                                    />
                                    <button onClick={handleAddVideoClick} style={buttonStyle}>
                                        Add Video
                                    </button>
                                    <button onClick={isRecording ? stopRecording : startRecording} style={buttonStyle}>
                                        {isRecording ? 'Stop Recording' : 'Record Video'}
                                    </button>

                                    {/* Video Preview */}
                                    {!isUploaded && (
                                        <>
                                            {videoFile && (
                                                <div>
                                                    <h3>Selected Video</h3>
                                                    <video src={videoFile} controls width="300" style={{ margin: '10px 0' }}></video>
                                                </div>
                                            )}

                                            {recordedVideoURL && (
                                                <div>
                                                    <h3>Recorded Video</h3>
                                                    <video src={recordedVideoURL} controls width="300" style={{ margin: '10px 0' }}></video>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Uploaded Video Preview */}
                                    {isUploaded && (
                                        <div>
                                            <h3>Video Uploaded Successfull</h3>
                                            {/* <video src={videoFile} controls autoPlay width="300" style={{ margin: '10px 0' }}></video> */}
                                        </div>
                                    )}

                                    {/* Recording Live Stream */}
                                    {isRecording && (
                                        <div>
                                            <h3>Recording...</h3>
                                            <video ref={videoRef} autoPlay width="300" style={{ margin: '10px 0' }}></video>
                                        </div>
                                    )}

                                    {/* Upload Button */}
                                    <button onClick={handleUpload} style={buttonStyle}>
                                        Upload Video
                                    </button>
                                </div>
                            </>
                        }


                        {component ==="review" &&
                        <>
                        {arrivedVideo?.length ?
                <>
                    Here is Uploaded Video <br />
                    <div className='row row-cols-lg-2 row-cols-md-3 row-cols-2 px-3'>
                        {arrivedVideo && arrivedVideo.length > 0 ? (
                            arrivedVideo.map((data, i) => (
                                <div className='col' style={{height:"270px"}} key={i}>
                                    <video src={data.url} controls autoPlay style={{ margin: '10px 0', maxWidth:"90%", maxHeight:"90%" }}></video>
                                </div>
                            ))
                        ) : (
                            <p>No videos available</p>
                        )}
                    </div>
                </>
                : 'No Video Added By This User'
            }
                        </>
                        }
                    </div>
                </div>
            </div>
        </section >
    );
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default UserPanel;
