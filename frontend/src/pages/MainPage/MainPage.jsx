import React from 'react';
import LoanList from './LoanList/container';
import Base from '../../components/Base/Base';

const MainPage = () => {
  const render = (
    <>
      <LoanList />
    </>
  );
  return render;
}

export default Base(MainPage);
