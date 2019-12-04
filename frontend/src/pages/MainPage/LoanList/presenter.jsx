import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from '@material-ui/icons/Chat';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TransactionList from '../TransactionList/container';
import Budget from '../subcomponents/Budget/Budget';
import TotalMoney from '../subcomponents/TotalMoney/TotalMoney';
import TotalUsers from '../subcomponents/TotalUsers/TotalUsers';
import TaskProgress from '../subcomponents/TasksProgress/TasksProgress';
import CreateLoan from '../../../components/CreateLoan/CreateLoan';
import './presenter.css';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.defaultProps = {
  children: null,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 550,
  },
  tabs: {
    width: 270,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  fab: {
    margin: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

export default function SimpleTabs(props) {
  const {
    notCompletedLoanList,
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addButtonLen = notCompletedLoanList.length;

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {notCompletedLoanList.map((loan, idx) => (
          <Tab
            key={loan}
            label={
              (
                <div>
                  <Card className={classes.card}>
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                          Totol Members:
                          {loan.num_members}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {loan.deadline.replace(/T.*/, '')}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              )
          }
            {
              ...
                a11yProps(idx)}
          />
        ))}
        <Tab label={
          (
            <div>
              <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
              </Fab>
            </div>
          )
        }
        />
      </Tabs>
      <div>
        {notCompletedLoanList.map((loan, idx) => (
          <TabPanel key={loan} value={value} index={idx}>
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <Budget>
                  {loan.total_money}
                </Budget>
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalUsers>
                  {loan.num_members}
                </TotalUsers>
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TaskProgress>
                  33.3
                </TaskProgress>
              </Grid>
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalMoney>
                  {loan.total_money}
                </TotalMoney>
              </Grid>
            </Grid>
            <TransactionList loan={loan} />
            <Link href={`/loan/chatroom/${loan.id * 55886609}`}>
              <ChatIcon style={{ fontSize: 50 }} />
            </Link>
          </TabPanel>
        ))}
        <TabPanel value={value} index={addButtonLen}>
          <CreateLoan />
        </TabPanel>
      </div>
    </div>
  );
}

SimpleTabs.propTypes = {
  notCompletedLoanList: PropTypes.any.isRequired,
};
