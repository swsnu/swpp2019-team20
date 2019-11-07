import React, { useState } from 'react';
import SearchBar from '../../subcomponents/SearchBar/SearchBar';

/*participants list*/
import MaterialTable from 'material-table';
/*outlined box*/
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
/* date selecter */
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/* interest switch */
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
/* interest input */
import TextField from '@material-ui/core/TextField';
/* selector */
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateLoan = () => {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const DateToString = (date) => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [participants, setParticipants] = useState([{ id: 0, paid_money: 0 }]);
  const [deadline, setDeadline] = useState(new Date());
  const [interestValid, setInterestValid] = React.useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [interestType, setInterestType] = useState("hour");
  const [alertFrequency, setAlertFrequency] = useState('very low');

  const [columns, setColumns] = React.useState([
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]);

  /*----------------------------------------*/
  /* used for sending query */
  const articlePostHandler = () => {
    let errorMessage = '';
    if (participants.length < 2) errorMessage += '\nIt needs more participants.';
    if (interestValid ) {
      if (interestRate === 0) errorMessage += '\nWrite interest rate or disable it.';
      if ( interestType === "") errorMessage += '\nSelect the type of interest.';
    }

    if (errorMessage === '') {
      const data = {
        'participants': participants,
        'deadline': DateToString(deadline) + 'T23:59:59Z',
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
    console.log(data);
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

    if (response.status !== 201) {
      window.alert("error");
    } else {
      window.alert("success");
    }
  };

  /*----------------------------------------*/
  /* used for changing values */


  const add_user = () => {
    setParticipants([
      ...participants,
      {
        id: 0,
        paid_money: 0,
      }
    ]);
  };

  const change_user_money = (index, money) => {
    let new_participants = [...participants];
    new_participants[index].paid_money = money;
    setParticipants(new_participants);
  }

  const change_user_id = (index, id) => {
    let new_participants = [...participants];
    new_participants[index].id = id;
    setParticipants(new_participants);
  }

  const handleDeadlineChange = date => {
    setDeadline(date);
  };

  /*----------------------------------------*/
  /* show participants list */

  const participants_list = participants.map(
    (participant, index) => {
      let rating;
      const setUser = (user) => {
        if (user !== null) {
          console.log(user.id);
          rating = user.rating;
          change_user_id(index, user.id);
        }
      }
      return (
        <div>
          id: <SearchBar setUser={setUser} />
          paid money: <input className='paid_money' type='number' value={participant.paid_money} onChange={(e) => change_user_money(index, e.target.value)} />
          rating: <h3 className='rating'>{rating}</h3>
        </div>
      )
    }
  )

  /*----------------------------------------*/
  /* view */

  return (
    <div className="create-loan">
      {participants_list}
      <br />
      
      


      <Button variant="outlined" className={classes.button} onClick={() => add_user()}>
        Add a participant
      </Button>
      <br />

      Deadline<br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={deadline}
            onChange={/*handleDeadlineChange*/(date)=>setDeadline(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <br />
      
      <FormControlLabel
        control={
          <Switch
            checked={interestValid}
            onChange={(event)=>setInterestValid(event.target.checked)}
            value="interestValid"
            color="primary"
          />
        }
        label="Interest"
      />

      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-number"
          label="Interest rate"
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          disabled={!interestValid}
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
        />
      </form>
      
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Interest Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={interestType}
          onChange={(event)=>setInterestType(event.target.value)}
          displayEmpty
          className={classes.selectEmpty}
          disabled={!interestValid}
        >
          <MenuItem value="hour">hour</MenuItem>
          <MenuItem value="day">day</MenuItem>
          <MenuItem value="week">week</MenuItem>
          <MenuItem value="month">month</MenuItem>
          <MenuItem value="year">year</MenuItem>
        </Select>
        <FormHelperText>select interest type</FormHelperText>
      </FormControl>
      <br />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Alert Frequency
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={alertFrequency}
          onChange={(event)=>setAlertFrequency(event.target.value)}
          labelWidth={labelWidth}
        >
          <MenuItem value="very low">very low</MenuItem>
          <MenuItem value="low">low</MenuItem>
          <MenuItem value="medium">medium</MenuItem>
          <MenuItem value="high">high</MenuItem>
          <MenuItem value="very high">very high</MenuItem>
        </Select>
      </FormControl>
      <br />

      <Button variant="contained" color="primary" className={classes.button} onClick={() => articlePostHandler()}>
        Register
      </Button>

    </div>
  )

}

export default CreateLoan;
