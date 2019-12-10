import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Presenter from './presenter';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');
  const [mine, setMine] = useState(false);

  const { userID } = useParams();

  const fetchProfile = async () => { // get profile information of this user ID
    const res = await fetch(`/account/user/${userID}`, {
      method: 'GET',
      credential: 'include',
    });
    const info = await res.json();
    setUserInfo(info);
    setLoading(false);
  };

  const isMine = async () => { // set if this profile is Mine
    const res = await fetch('/account/user/me', {
      method: 'GET',
      credential: 'include',
    });
    const info = await res.json();
    setMine(info.id === Number(userID));
  };

  useEffect(() => {
    fetchProfile();
    isMine();
  }, [isLoading, userID, mine]);

  const render = (
    <Presenter
      userInfo={{ ...userInfo, mine }}
    />
  );
  return render;
};

export default Profile;
