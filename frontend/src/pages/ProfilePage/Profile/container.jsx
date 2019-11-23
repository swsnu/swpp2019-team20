import React, { useState, useEffect } from 'react';
import Presenter from './presenter';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');

  const targetUrl = 'account/user/me';
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
