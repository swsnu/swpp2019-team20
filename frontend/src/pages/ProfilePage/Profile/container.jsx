import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Presenter from './presenter';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');

<<<<<<< HEAD
  const targetUrl = '/account/user/me';
=======
  const { userID } = useParams();

  const targetUrl = `/account/user/${userID}`;
>>>>>>> 85030f2c1770249146f6ff8f172d33c6092ecd63
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
  }, [isLoading]);

  const render = (
    <Presenter
      userInfo={userInfo}
    />
  );
  return render;
};

export default Profile;
