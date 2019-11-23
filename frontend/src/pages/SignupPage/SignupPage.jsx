import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form } from 'react-final-form';
import Base from '../../components/Base/Base';
import Typography from '../../components/subcomponents/Typography';
import AppForm from '../../components/subcomponents/AppForm';
import RFTextField from '../../components/subcomponents/form/RFTextField';
import FormButton from '../../components/subcomponents/form/FormButton';
import { getCookie } from '../../utils';

const useStyles = makeStyles((theme) => ({
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

const SignUpPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = async (values) => {
    await fetch('/account/token', {
      method: 'GET',
      credentials: 'include',
    });

    const csrftoken = getCookie('csrftoken');

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

    if (response.status === 201) {
      history.push('/index');
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
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <div id="signup-username-input">
                <Field
                  autoComplete="username"
                  component={RFTextField}
                  disabled={submitting}
                  fullWidth
                  label="Username"
                  margin="normal"
                  name="username"
                  required
                />
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div id="signup-fisrtname-input">
                    <Field
                      autoFocus
                      component={RFTextField}
                      autoComplete="first_name"
                      fullWidth
                      label="First name"
                      name="first_name"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div id="signup-lastname-input">
                    <Field
                      component={RFTextField}
                      autoComplete="last_name"
                      fullWidth
                      label="Last name"
                      name="last_name"
                    />
                  </div>
                </Grid>
              </Grid>
              <div id="signup-email-input">
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  disabled={submitting}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
              </div>
              <div id="signup-password-input">
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
              </div>
              <div id="signup-kakaoid-input">
                <Field
                  autoComplete="kakao_id"
                  component={RFTextField}
                  disabled={submitting}
                  fullWidth
                  label="Kakao ID"
                  margin="normal"
                  name="kakao_id"
                  required
                />
              </div>
              <div id="signup-phone-input">
                <Field
                  autoComplete="phone"
                  component={RFTextField}
                  disabled={submitting}
                  fullWidth
                  label="Phone"
                  margin="normal"
                  name="phone"
                  required
                />
              </div>
              <div id="signup-submit-button">
                <FormButton
                  className={classes.button}
                  disabled={submitting}
                  color="secondary"
                  fullWidth
                >
                  Sign Up
                </FormButton>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </AppForm>
    </fragment>
  );
};

export default Base(SignUpPage);
