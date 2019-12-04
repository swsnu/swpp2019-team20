import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Presenter from './presenter';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');

  const { userID } = useParams();

  const targetUrl = `/account/user/${userID}`;
  const fetchProfile = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    });
    const info = await res.json();
    setUserInfo(info);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [isLoading, userID]);

  const render = (
    <Presenter
      userInfo={userInfo}
    />
  );
  return render;
};

export default Profile;
