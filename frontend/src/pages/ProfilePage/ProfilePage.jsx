import React, { useState, useEffect } from 'react';
import Base from '../../components/Base/Base';
import Presenter from './presenter';
import LoanList from './LoanList';
import ReviewList from './ReviewList';


const ProfilePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserID] = useState(-1);
  const [kakaoId, setKakaoId] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  const profileTargetUrl = 'http://127.0.0.1:8000/account/user/3';
  const fetchProfile = async () => {
    const res = await fetch(profileTargetUrl, {
      credentials: 'same-origin',
    })
    const info = await res.json();
    const infoDict = JSON.parse(info);
    console.log(infoDict)
    const {
      user: curUserId, username: curUserName, kakao_id: curKakaoID, phone: curPhone, bio: curBio,
    } = infoDict;
    setUserID(curUserId);
    setUsername(curUserName)
    setKakaoId(curKakaoID);
    setPhone(curPhone)
    setBio(curBio)
    setLoading(false);
  }
  /*
  const LoanListTargetUrl = 'http://127.0.0.1:8000/loan';
  const fetchLoanList = async () => {
    const res = await fetch(LoanListTargetUrl, {
      credentials: 'same-origin',
    })
  }
  */
  useEffect(() => {
    fetchProfile();
    // fetchLoanList();
  }, [isLoading]);

  const render = (
    <>
      <Presenter
        userId={userId}
        username={username}
        kakaoId={kakaoId}
        phone={phone}
        bio={bio}
      />
      <LoanList />
      <ReviewList />
    </>
  );
  return render;
};

export default Base(ProfilePage);
