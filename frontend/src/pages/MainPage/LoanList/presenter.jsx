import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const {
    completedLoanList, notCompletedLoanList, children
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <h2>CURRENT LOAN LIST</h2>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {completedLoanList.map((loan,idx) => (
            <Tab label={"loan " + loan.id} {...a11yProps(idx)}/>
          ))}
        </Tabs>
      </AppBar>

      <div>
      {completedLoanList.map((loan, idx) => (
        <TabPanel value={value} index={idx}>
          <h2 style={{ color: 'blue' }}>Loan {loan.id}</h2>
          <div>
          {
           Object.keys(loan).map((key, idx) => <p key={idx}> {key}: {loan[key]}</p>)
          }
          </div>
        </TabPanel>
      ))}
      </div>
    </div>
  );
}

const Presenter = (props) => {
  const {
    completedLoanList, notCompletedLoanList,
  } = props;
  return (
    <>
      <h2>CURRENT LOAN LIST</h2>
      <LoanList list={completedLoanList} />
    </>
  );
}

const LoanList = ({ list }) => {
  return (
    <SimpleTabs>
    <div>
      {list.map((loan) => (

        <li key={loan.id}><h3>Loan {loan.id}</h3>
        <div>
        {
          Object.keys(loan).map((key, index) => <p key={index}> {key}: {loan[key]}</p>)
        }
        </div>
        </li>
      ))}
    </div>
    </SimpleTabs>
  )
}

