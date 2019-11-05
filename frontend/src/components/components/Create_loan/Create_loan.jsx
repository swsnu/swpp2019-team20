import React, { useState } from 'react';

const Create_loan = () => {

    const getDate = () => {
        var today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    const [participants, setParticipants] = useState( [ {'id': 'GET_CURRENT_USER_NAME', 'paid_money': 0} ] );
    const [deadline, setDeadline] = useState(getDate());
    const [interestValid, setInterestValid] = useState(false);
    const [interestRate, setInterestRate] = useState(0);
    const [interestType, setInterestType] = useState('');
    const [alertFrequency, setAlertFrequency] = useState('');

    
    const articlePostHandler = () => {
        let errorMessage = '';
        if (participants.length < 2 ) errorMessage += '\nIt needs more participants.';
        if (interestValid) {
            if ( interestRate === 0 ) errorMessage += '\nWrite interest rate or disable interest.';
            if ( interestType === '') errorMessage += '\nSelect interest type or disable interest.';
        }
        if (alertFrequency === '') errorMessage += '\nSelect alert frequency.';

        if ( errorMessage === '' ) {
            //triggerLoanPost();
        } else {
            window.alert(errorMessage);
        }
    }
    /*
    const triggerLoanPost = async () => {
        await fetch('/account/token', {
            method: 'GET',
            credential: 'include',
        });

        let csrftoken = getCookie('csrftoken');

        const response = await fetch('loan/loan', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        });


    };
    

    const participants_list = participants.map(
        participant => {

            <input id = 'paid_money' type = 'text' value={participant.paid_money} onChange={(e)=>setParticipants(participant.paid_money = e.target.value)}/>

        }
    )
        */

    return(
        <div className="create-loan">

            <button className="add_user">Add a participant</button>
            <br/>

            Deadline: <input className="deadline" type="date" value={deadline} min={getDate()} onChange={(e)=>setDeadline(e.target.value)}/>
            <br/>
            
            <h3>Options</h3>
            <br/>
            
            <label>
                Interest
                <input className="interest_valid" type="checkbox" checked={interestValid} onChange={(e)=>setInterestValid(e.target.value)}/>
                Rate:
                <input className="interest_rate" type="number" disabled={!interestValid} value={interestRate} onChange={(e)=>setInterestRate(e.target.value)}/>
                %
                <select className="interest_type" disabled={!interestValid} value={interestType} onChange={(e)=>setInterestType(e.target.value)}>
                    <option value="hour">hour</option>
                    <option value="day">day</option>
                    <option value="week">week</option>
                    <option value="month">month</option>
                    <option value="year">year</option>
                </select>
            </label>
            <br/>

            Alert frequency
            <select className="alert_frequency" value={alertFrequency} onChange={(e)=>setAlertFrequency(e.target.value)}>
                <option value="very low">very low</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="very high">very high</option>
            </select>
            <br/>

            <button className="register-loan" onClick = {()=>articlePostHandler()}>Register</button>
            <br/>
        </div>
    )

}

export default Create_loan;