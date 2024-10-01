import React, { useState, useEffect, useRef } from "react";
import { BsFillGridFill, BsListStars } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import axios from "axios";
import "./products.css";

const Products = () => {

  const cu = useSelector((store) => store.userSection.cu);
  const { prodctName } = useParams();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGrid, setActiveGrid] = useState("grid");
  const [sort, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [filter, setFilter] = useState(false);
  const move = useNavigate();

  const sendWhatsAppMessage = (title) => {
    const message = `I'm interested in product.\n${title}\nCan you provide more details?`;
    const whatsappURL = `https://wa.me/+447392608087?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const Filter = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    setCategory(prodctName?.toLowerCase());
  }, [prodctName]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true)
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/products`;
        const params = {
          name: category,
          sort: sort,
          minPrice: minPrice,
          maxPrice: maxPrice,
          search: search
        };
        const res = await axios.get(apiUrl, { params, cancelToken: source.token });
        setData(res?.data);
        setLoading(false);

      } catch (error) {
        if (axios.isCancel(error)) {
        } else { }
      }
    };
    fetchData();
    return () => {
      source.cancel();
    };
  }, [category, sort, minPrice, maxPrice, search]);

  // const handleMinRangeChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   setMinPrice(value);
  // };
  console.log("category is =", category)

  const handleMaxRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxPrice(value);
  };

  const SearchInput = (e) => {
    setSearch(e.target.value);
  };

  function ClearFilter() {
    setCategory("all");
    setSortOrder("");
    setSearch("");
    setActiveGrid("grid");
    setMaxPrice(3000);
    setMinPrice(0);
  }

  return (
    <>
      <div className="container-fluid min-vh-100 my-lg-5 my-3" style={{ overflow: "hidden" }}>
        <div className={`filter_col_display ${filter ? "showFilter" : "filter_col"}`}>
          <div className="d-flex justify-content-end mb-3" style={{ borderBottom: "1px solid lightgray" }}>
            <button className="btn" type="button" style={{ color: "red" }} onClick={() => setFilter(false)} >
              <RxCross1 /> CLOSE
            </button>
          </div>
          <p className="fs-4" style={{ color: "#02025E", fontWeight: "500" }}>Product Categories</p>

          <div className="accordion d-flex  flex-column gap-4" id="accordionExample">

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Sort By
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p onClick={() => setSortOrder("")}>All</p>
                  <p
                    className={sort === "asc" ? "activeCategory" : ""}
                    onClick={() => setSortOrder("asc")}>Price (Highest)</p>
                  <p
                    className={sort === "desc" ? "activeCategory" : ""}
                    onClick={() => setSortOrder("desc")}>Price (Lowest)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="m-0" style={{ fontSize: "16px", fontWeight: "500" }}>Price Range</p>
            </div>
            <div className="px-2" style={{ position: "relative" }}>
              <div className="d-flex">
                <input
                  type="range"
                  id="minPriceRange"
                  className="w-50"
                  value={1}
                  style={{ height: "2px" }}
                />
                <input
                  type="range"
                  id="maxPriceRange"
                  className="w-50"
                  min={1}
                  max={3000}
                  step={10}
                  value={maxPrice}
                  onChange={handleMaxRangeChange}
                  style={{
                    height: "2px",
                    position: "absolute",
                    top: "0px",
                    right: "4px",
                  }}
                />
              </div>
              <p className="m-0 mt-2 px-3" style={{ color: "red" }}>
                &pound;{minPrice} - &pound;{maxPrice}
              </p>
            </div>
          </div>
          {/* <button
            className="btn btn-danger text-uppercase my-4 w-100"
            onClick={ClearFilter}
          >
            Clear filter
          </button> */}
        </div>

        <div className="row">

          <div className="col-lg-2 col_hide">
            <div>
              <p className="fs-5 fw-bolder" style={{ color: "#1b2950" }}>Product Categories</p>
            </div>
            <div className="accordion d-flex  flex-column gap-4" id="accordionExample">

              <div>
                <p className="m-0" style={{ fontSize: "16px", fontWeight: "500" }}>Price Range</p>
              </div>
              <div className="px-2" style={{ position: "relative" }}>
                <div className="d-flex">
                  <input
                    type="range"
                    id="minPriceRange"
                    className="w-50"
                    value={1}
                    style={{ height: "2px" }}
                  />
                  <input
                    type="range"
                    id="maxPriceRange"
                    className="w-50"
                    min={0}
                    max={3000}
                    step={10}
                    value={maxPrice}
                    onChange={handleMaxRangeChange}
                    style={{
                      height: "2px",
                      position: "absolute",
                      top: "0px",
                      right: "4px",
                    }}
                  />
                </div>
                <p className="m-0 mt-2 px-3" style={{ color: "red" }}>
                  &pound;{minPrice} - &pound;{maxPrice}
                </p>
              </div>
              {/* <button
                className="btn btn-danger text-uppercase my-4 w-100"
                onClick={ClearFilter}
              >
                Clear filter
              </button> */}
            </div>
          </div>

          <div className="col-lg-10 col-md-12 col-12">
            <div className="search_bar1 mt-2 mb-3">
              <input
                type="search"
                className="form-control w-80 p-2 border"
                placeholder="Search Anything"
                value={search}
                onChange={SearchInput}
              />
            </div>
            <div className="mb-4 mt-1 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-1">
                <div
                  className={`grid_icon ${activeGrid === "grid" ? "active" : ""
                    }`}
                  onClick={() => setActiveGrid("grid")}
                >
                  <BsFillGridFill />
                </div>
                <div
                  className={`grid_icon ${activeGrid === "list" ? "active" : ""
                    }`}
                  onClick={() => setActiveGrid("list")}
                >
                  <BsListStars />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="fw-bolder my-2">
                  {data?.filter((item) => (item.stock === undefined || item.stock === false)).length} Products
                </p>
              </div>
              {/* <div className="search_bar d-flex align-items-center">
                <input
                  type="search"
                  className="form-control w-100 p-2 border"
                  placeholder="Search Anything"
                  value={search}
                  onChange={SearchInput}
                />
              </div> */}
              <div>
                <button><FaFilter /></button>
              </div>

            </div>

            {/* Grid */}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4 mt-3">
              {(data?.filter((item) => (item.stock === undefined || item.stock === false)).length === 0 || loading) && (
                <div className='col-12 d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
                  {loading ? <Loader /> : (
                    data?.length === 0 ? "No Product available" : null
                  )}
                </div>
              )}
              {(activeGrid === "grid" && !loading && data?.length > 0) &&
                data.map((product, index) => (
                  <div className="col card" key={index}>
                    <a href={`/product/${product.title.replace(/ /g, '-')}/${product._id}`}>
                      <div className="card_img">
                        <img src={product?.images[0]} className="text-center" alt={product?.title} />
                      </div>
                      <p className="card_title">{product?.title}</p>
                      <p className="final_price">
                        ${product?.Fprice.toFixed(0)}
                        {product?.discount > 0 && (
                          <>
                            <span className="mx-2 text-muted discounted_price"><s>${product?.price.toFixed(0)}</s></span>
                            <span className="mx-2 discount">-{product?.discount}%</span>
                          </>
                        )}
                      </p>
                    </a>
                  </div>
                ))}
            </div>

            {/* List */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-2 g-4 my-3">
              {(activeGrid === "list" && !loading && data?.length > 0) &&
                data.filter((item) => (item.stock === undefined || item.stock === false)).map((product, index) => {
                  return (
                    <>
                      <div className="col d-flex gap-2 px-0 grid_box_main"
                        key={index}
                        style={{ overflow: "hidden" }}
                      >
                        <a href={`/product/${product.title.replace(/ /g, '-')}/${product._id}`} style={{ width: "40%" }}>
                          <div className="p_img_box_grid">
                            <img src={product.images[0]} alt="No network"
                              style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
                            />
                            {product.discount && product.discount > 0 ? (
                              <div className="discount">
                                {`${product.discount}%`}
                              </div>
                            ) : null}
                            <div className="overlay">
                              {product.images[1] && (
                                <img src={product.images[1]} alt="" />
                              )}
                            </div>
                          </div>
                        </a>
                        <div
                          className="d-flex flex-column justify-content-between gap-3"
                          style={{ width: "60%" }}
                        >
                          <div>
                            <p className="card_title px-2 m-0">{product.title}</p>
                            {product.description && (
                              <p className="p_description px-2">
                                {product.description}
                              </p>
                            )}
                          </div>
                          <div className="text-left">
                            {product.discount && product.discount > 0 ? (
                              <>
                                <span className="card_Fprice px-2 ">
                                  {" "}
                                  {`£${product.Fprice?.toFixed()}`}
                                </span>
                                <span className="card_price">
                                  <s>{`£${product.price?.toFixed()}`}</s>
                                </span>
                              </>
                            ) : (
                              <span className="card_Fprice px-2 ">
                                {" "}
                                {`£${product.Fprice?.toFixed()}`}
                              </span>
                            )}
                          </div>
                          <div className="">
                            <a href={`/product/${product.title.replace(/ /g, '-')}/${product._id}`}>
                              <button className="btn review_btn btn-outline-primary fs-10 px-5" style={{ width: "fit-content" }}>
                                View Detail
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Products;



