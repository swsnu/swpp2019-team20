import React from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Base from '../../components/Base/Base';
import Typography from '../../components/subcomponents/Typography';
import AppForm from '../../components/subcomponents/AppForm';
import { email, required } from '../../components/subcomponents/form/validation';
import RFTextField from '../../components/subcomponents/form/RFTextField';
import FormButton from '../../components/subcomponents/form/FormButton';
import FormFeedback from '../../components/subcomponents/form/FormFeedback';
import { getCookie } from '../../utils';

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [sent] = React.useState(false);

  const validate = values => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };


  const onSubmit = async values => {
    await fetch('/account/token', {
      method: 'GET',
      credentials: 'include',
    });

    let csrftoken = getCookie('csrftoken');

    const response = await fetch('/account/signup', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(values), // body data type must match "Content-Type" header
    });

    if (response.status !== 201) {
      window.alert("error" + response.status);
    } else {
      window.alert("success" + response.status);
    }
  };

  return (
    <fragment>
      <AppForm>
        <fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin/" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </fragment>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="username"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="first_name"
                    fullWidth
                    label="First name"
                    name="first_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="last_name"
                    fullWidth
                    label="Last name"
                    name="last_name"
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <Field
                autoComplete="kakao_id"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Kakao ID"
                margin="normal"
                name="kakao_id"
                required
              />
              <Field
                autoComplete="phone"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Phone"
                margin="normal"
                name="phone"
                required
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )} />
      </AppForm>
    </fragment>
  );
}

render(<SignUp />, document.getElementById('root'));

export default Base(SignUp);

