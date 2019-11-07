import React, { useState, useEffect } from 'react';
import LatestOrders from './presenter';

const TransactionList = () => {
  const [doneTxList, setDoneTxList] = useState([]);
  const [ongingTxList, setOngingTxList] = useState([]);

  const loanId = 5
  const targetUrl = `/loan/loan-tranaction/${loanId}`;
  const fetchTransactionList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    })
    const txRawList = await res.json()
    const curDoneTxList = txRawList.filter((tx) => tx.completed === true)
    const curOngingTxList = txRawList.filter((tx) => tx.completed === false)
    console.log(curDoneTxList)
    console.log(curOngingTxList)
    setDoneTxList(curDoneTxList);
    setOngingTxList(curOngingTxList);
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

  const render = (
    <LatestOrders doneTxList={doneTxList} ongingTxList={ongingTxList} />
  );
  return render;
};

export default TransactionList;
