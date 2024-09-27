import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

const Reviews = () => {


    const allComments = useSelector((store) => store.Comment.comment);
    const dispatch = useDispatch()

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
                    if (res) {
                        dispatch({ type: "ADD_COMMENT", payload: res.data });
                    }
                    setLoading(false);
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



    return <>
        <div className='container my-5'>
            <div className='row'>
                <div className='col-12 mb-5'>
                    <h1 className='text-center home_heading'>OUR HAPPY CUSTOMERS</h1>
                </div>
                <div className='h_box_main'>
                    {loading ? (
                        <div
                            className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                            style={{ height: "80vh" }}
                        >
                            <Loader />
                        </div>
                    ) : (comments.map((item, index) => {
                        return <>
                            <div className='card border rounded-2 p-2' style={{ width: "270px" }} key={index}>
                                <div className="card_img mb-2">
                                    <img src={item?.image} className="text-center" alt={item?.title} />
                                </div>
                                <p className='text-center'>{item?.comment}</p>
                                <p className='text-center fw-bolder'>{item?.name}</p>
                            </div>
                        </>
                    })
                    )}

                </div>
            </div>
        </div>

    </>
}

export default Reviews