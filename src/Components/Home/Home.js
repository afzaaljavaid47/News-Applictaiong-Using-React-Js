import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Moment from 'react-moment';
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
  const [title, setTitle] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(3);
  const [totalRecords, settotalRecords] = useState();
  const [date, setDate] = useState();

  const formSubmit = (e) => {
    setNews([]);
    e.preventDefault();
    setTitle(e.target.title.value);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&q=${title}&from=2023-05-23&sortBy=popularity&apiKey=fb8e0b0a82454399a6f8d317b75f1c73&pageSize=${pageSize}&page=${page}&category=${[
          props.category,
        ]}`
      )
      .then((response) => {
        console.log("Api data", response.data.articles);
        setNews(response.data.articles);
        setLoading(false);
        settotalRecords(response.data.totalResults);
        var day = response.data.publishedAt.getDate();
        console.log("Date : ", day);
        setDate(response.data.publishedAt.getDate());
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  }, [title, page, pageSize]);

  const nextPageBtn = () => {
    console.log("Next btn pressed");
    setPage(page + 1);
  };
  const prevPageBtn = () => {
    console.log("Prev btn pressed");
    setPage(page - 1);
  };
  const RecordsPerPage = (e) => {
    console.log("Page size :", e.target.value);
    setpageSize(e.target.value);
  };
  return (
    <div className="container">
      <div className="row justify-content-between my-4">
        <div className="col-md-4">
          <h3>
            {props.category.charAt(0).toUpperCase() +
              props.category.slice(1).toLowerCase()}{" "}
            News
          </h3>
        </div>
        <div className="col-md-4 ml-auto">
          <form onSubmit={formSubmit} className="input-group">
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="Search News"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
      {loading ? (
        <>
          <div className="row">
            <div className="col-md-4 my-4">
              <Stack spacing={1}>
                <Skeleton
                  className="m-auto"
                  variant="circular"
                  width={100}
                  height={100}
                />
                <Skeleton variant="rectangular" width={410} height={200} />
                <Skeleton variant="rounded" width={70} height={30} />
              </Stack>
            </div>
            <div className="col-md-4 my-4">
              <Stack spacing={1}>
                <Skeleton
                  className="m-auto"
                  variant="circular"
                  width={100}
                  height={100}
                />
                <Skeleton variant="rectangular" width={410} height={200} />
                <Skeleton variant="rounded" width={70} height={30} />
              </Stack>
            </div>
            <div className="col-md-4 my-4">
              <Stack spacing={1}>
                <Skeleton
                  className="m-auto"
                  variant="circular"
                  width={100}
                  height={100}
                />
                <Skeleton variant="rectangular" width={410} height={200} />
                <Skeleton variant="rounded" width={70} height={30} />
              </Stack>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="row">
        {news.length > 0 && !loading ? 
        (news.filter((img) => img.urlToImage !== null).map((data, index) => {
              return (
                <div className="col-md-4 my-4" key={index}>
                  <Stack spacing={1}>
                    {data.author ? (
                      <b>{data.author.slice(0, 47)}</b>
                    ) : (
                      <Skeleton
                        className=""
                        variant="rectangular"
                        width={150}
                        height={15}
                      />
                    )}
                    {data.title ? (
                      <p>{data.title.slice(0, 50)}</p>
                    ) : (
                      <Skeleton variant="rectangular" width={410} height={10} />
                    )}
                    {data.urlToImage ? (
                      <img
                        alt={data.title}
                        src={data.urlToImage}
                        width={410}
                        height={200}
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={410}
                        height={200}
                      />
                    )}
                    {data.content ? (
                      <p>{data.content.slice(0, 208)}</p>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={410}
                        height={96}
                      />
                    )}
                    <p className="text-muted">
                      By {data.author ? data.author : "Unknown"} on <Moment format="D MMM YYYY">{data.publishedAt}</Moment>
                    </p>
                    {data.url ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        href={data.url}
                      >
                        Read More
                      </a>
                    ) : (
                      <Skeleton variant="rounded" width={70} height={30} />
                    )}
                  </Stack>
                </div>
              );
            })
        ) 
        
        : loading ? '': (
          <h4 style={{ textAlign: "center" }}>
            No any news found on this topic
          </h4>
        )}
      </div>
      <div className="container my-3">
        <div className="d-flex justify-content-between">
          <button
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={prevPageBtn}
          >
            &larr; Back
          </button>
          <p>
            Page {page} of {Math.ceil(totalRecords / pageSize)}
          </p>
          <select
            onChange={RecordsPerPage}
            className="form-select"
            style={{ width: "120px" }}
          >
            <option selected value="3">
              3
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <button
            disabled={page >= Math.ceil(totalRecords / pageSize)}
            className="btn btn-dark"
            onClick={nextPageBtn}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
