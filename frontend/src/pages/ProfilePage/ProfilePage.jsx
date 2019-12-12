import React from 'react';
import Profile from './Profile/container';
import Base from '../../components/Base/Base';
import './ProfilePage.css';
import LoanList from './CompletedLoanList/container';
import ReviewList from './ReviewList/container';

const ProfilePage = () => {
  const render = (
    <>
      <Profile />
      <div style={{padding: '10px'}}/>
      <LoanList />
      <div style={{padding: '20px'}}/>
      <ReviewList/>
    </>
  );
  return render;
};

export default Base(ProfilePage);
