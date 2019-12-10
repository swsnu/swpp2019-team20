import React, { useState, useEffect } from 'react';
import Presenter from './presenter';
import {useParams} from "react-router";

const ReviewList = () => {
  const [reviewList, setReviewList] = useState([]);

  const { userID } = useParams();
  const targetUrl = `/review/${userID}`
  const fetchReviewList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    });
    const reviewList = await res.json();
    setReviewList(reviewList);
  };

  useEffect(() => {
    fetchReviewList();
  }, []);

  const render = (
    <Presenter reviewList={reviewList} />
  );
  return render;
};

export default ReviewList;
