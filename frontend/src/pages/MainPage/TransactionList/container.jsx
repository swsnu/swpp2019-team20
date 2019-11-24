import React, { useState, useEffect } from 'react';
import Table from './presenter';
import { getCookie } from "../../../utils";

const TransactionList = (props) => {
  const { loan } = props;
  const [TxList, setTxList] = useState([]);
  const [currTxId, setCurrTxId] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loanId = loan.id;
    const targetUrl = `/loan/loan-transaction/${loanId}`;
    const fetchTransactionList = async () => {
      const res = await fetch(targetUrl, {
        method: 'GET',
        credential: 'include',
      });
      const curTxList = await res.json();
      setTxList(curTxList);
      setLoading(false);
    };
    fetchTransactionList();
  }, [isLoading]);

  const onSubmit = async (id) => {
    setCurrTxId(id);
    await fetch('/account/token', {
      method: 'GET',
      credentials: 'include',
    });

    const csrftoken = getCookie('csrftoken');
    const targetUrl = `/loan/transaction/${currTxId}`;
    const content = { "confirm": true }
    const response = await fetch(targetUrl, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(content), // body data type must match "Content-Type" header
    });

    alert(response.status)
    if (response.status === 403) {
      alert('you are not participant of this tx');
    }
    else alert('confirm!');
    setLoading(true);
  };

  const render = (
    <Table TxList={TxList} onClickBtn={onSubmit}/>
  );
  return render;
};

export default TransactionList;
