import React, { useState } from 'react';

const Create_loan = () => {
    const [interestValid, setInterestValid] = useState(false);
    const [interestRate, setInterestRate] = useState(0);
    const [interestType, setInterestType] = useState('');
    const [alertFrequency, setAlertFrequency] = useState('');

    return(
        <div className="create-loan">

            <button className="add_user">Add a participant</button>
            <br/>

            Deadline: <input className="deadline" type="date"/>
            
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
            <button className="register-loan">Register</button><br/>
        </div>
    )

}

export default Create_loan;