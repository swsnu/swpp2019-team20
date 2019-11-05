import React, { useState } from 'react';
import SearchBar from '../../subcomponents/SearchBar/SearchBar';

const Create_loan = () => {

    const getDate = () => {
        var today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    const [participants, setParticipants] = useState( [ {id: 'GET_CURRENT_USER_NAME', paid_money: 0} ] );
    const [deadline, setDeadline] = useState(getDate());
    const [interestValid, setInterestValid] = useState(false);
    const [interestRate, setInterestRate] = useState(0);
    const [interestType, setInterestType] = useState('hour');
    const [alertFrequency, setAlertFrequency] = useState('very low');

    
    const articlePostHandler = () => {
        let errorMessage = '';
        if (participants.length < 2 ) errorMessage += '\nIt needs more participants.';
        if (interestValid && interestRate === 0) errorMessage += '\nWrite interest rate or disable it.';

        if ( errorMessage === '' ) {
            const data = {
                'participants': participants,
                'deadline': deadline + 'T',
                'interest_rate': interestValid ? interestRate : 0,
                'interest_type': interestType,
                'alert_frequency': alertFrequency,
            }
            triggerLoanPost(data);
        } else {
            window.alert(errorMessage);
        }
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    const triggerLoanPost = async (data) => {
        await fetch('/account/token', {
            method: 'GET',
            credential: 'include',
        });

        let csrftoken = getCookie('csrftoken');

        const response = await fetch('/loan/loan', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 204) {
            window.alert("error");
        } else {
            window.alert("success");
        }
    };
    
    const change_user_money = (index, money) => {
        let new_participants = [...participants];
        new_participants[index].paid_money = money;
        setParticipants(new_participants);
    }

    const participants_list = participants.map(
        (participant, index) => {
            let rating;
            const setUser = (user) => {
                rating = user.rating;
            }
            return (
                <div>
                    id: <Searchbar setUser={setUser} />
                    paid money: <input className = 'paid_money' type = 'number' value={participant.paid_money} onChange={(e)=>change_user_money(index, e.target.value)}/>
                    rating: <h3 className = 'rating'>{rating}</h3>
                </div>
            )
        }
    )

    const add_user = () => {
        setParticipants([
            ...participants,
            {
                id: '',
                paid_money: 0,
            }
        ]);
    };

    return(
        <div className="create-loan">
            {participants_list}
            <br/>

            <button className="add_user" onClick={()=>add_user()}>Add a participant</button>
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