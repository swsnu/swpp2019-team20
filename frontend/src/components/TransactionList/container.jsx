import React, { useState, useEffect } from 'react';
import LatestOrders from './presenter';

const TransactionList = (props) => {
  const { loan } = props
  const [TxList, setTxList] = useState([]);

  const loanId = loan.id
  console.log(loanId)
  const targetUrl = `/loan/loan-tranaction/${loanId}`;
  const fetchTransactionList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    })
    const curTxList = await res.json()
    setTxList(curTxList);
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

  const render = (
    <LatestOrders TxList={TxList} />
  );
  return render;
};

export default TransactionList;
