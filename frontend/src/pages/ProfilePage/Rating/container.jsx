import React, { useState, useEffect } from 'react';
import Presenter from './presenter';
import {useParams} from "react-router";

const Rating = () => {
  const [rating, setRating] = useState([]);

  const { userID } = useParams();
  const targetUrl = `/review/rating/${userID}`
  const fetchRating = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    });
    const json = await res.json();
    const curRating = json.rating;
    setRating(curRating);
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const render = (
    <Presenter rating={rating} />
  );
  return render;
};

export default Rating;
