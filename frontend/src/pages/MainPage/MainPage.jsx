import React from 'react';
import LoanList from './LoanList/container';
import Base from '../../components/Base/Base';
import CreateLoan from '../../components/components/CreateLoan/CreateLoan';

const MainPage = () => {
  const render = (
    <>
      <LoanList />
      {/*<CreateLoan />*/}
    </>
  );
  return render;
}

export default Base(MainPage);
