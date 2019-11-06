import React, { useState, useEffect } from 'react';
import Presenter from './presenter';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserID] = useState(-1);
  const [kakaoId, setKakaoId] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const targetUrl = '/account/user/1';
  const fetchProfile = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    })
    const info = await res.json();
    const {
      id: curUserId, username: curUserName, kakao_id: curKakaoID, phone: curPhone, bio: curBio,
    } = info;
    setUserID(curUserId);
    setUsername(curUserName)
    setKakaoId(curKakaoID);
    setPhone(curPhone)
    setBio(curBio)
    setLoading(false);
  }

  useEffect(() => {
    fetchProfile();
  }, [isLoading]);

  const render = (
    <Presenter
      userId={userId}
      username={username}
      kakaoId={kakaoId}
      phone={phone}
      bio={bio}
    />
  );
  return render;
};

export default Profile;
