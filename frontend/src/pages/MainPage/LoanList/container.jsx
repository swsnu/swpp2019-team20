import React, { useState, useEffect } from 'react';
import SimpleTabs from './presenter';
import Loading from '../../../components/subcomponents/Loading/Loading';

const LoanList = () => {
  const [completedLoanList, setCompletedLoanList] = useState([]);
  const [notCompletedLoanList, setNotCompletedLoanList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const targetUrl = '/loan/loan';
  const fetchLoanList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    });
    const loanRawList = await res.json();
    const curCompletedLoanList = loanRawList.filter((loan) => loan.completed === true);
    const curNotCompletedLoanList = loanRawList.filter((loan) => loan.completed === false);
    setCompletedLoanList(curCompletedLoanList);
    setNotCompletedLoanList(curNotCompletedLoanList);
    setLoading(false);
  };

  useEffect(() => {
    fetchLoanList();
  }, [isLoading]);

  const render = isLoading ? <Loading /> : (
    <SimpleTabs notCompletedLoanList={notCompletedLoanList} completedLoanList={completedLoanList} />
  );
  return render;
};

export default LoanList;
