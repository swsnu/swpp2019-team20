import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TransactionList from '../../../components/TransactionList/TransactionList'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
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
    notCompletedLoanList, children
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tab label={
            <div>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Totol Members: {loan.num_members}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {loan.deadline.replace(/T.*/, '')}
                  </Typography>
                </CardContent>
              </div>
            </Card>
            </div>
          } {...a11yProps(idx)} />
        ))}
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tabs>
      <div>
        {notCompletedLoanList.map((loan, idx) => (
          <TabPanel value={value} index={idx}>
            <h2 style={{ color: 'red' }}>Loan {loan.id}</h2>
            <div>
              {
                Object.keys(loan).map((key, idx) => <p key={idx}> {key}: {loan[key]} </p>)
              }
            </div>
            {/*<TransactionList />*/}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
