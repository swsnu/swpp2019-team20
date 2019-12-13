import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Presenter from './presenter';

const ReviewList = () => {
  const [reviewList, setReviewList] = useState([]);

  const { userID } = useParams();
  const targetUrl = `/review/${userID}`;
  const fetchReviewList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    });
    const curReviewList = await res.json();
    setReviewList(curReviewList);
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
