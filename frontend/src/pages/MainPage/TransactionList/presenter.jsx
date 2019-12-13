import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  Button as MyButton, Header, Image, Modal,
} from 'semantic-ui-react';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestOrders = (props) => {
  const {
    className, TxList, onClickBtn, isBtnDisabled, username,
    popUp, handleChange, onSubmit, isDisable, ...rest
  } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Our Transactions"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lender</TableCell>
                  <TableCell>Borrower</TableCell>
                  <TableCell>Money</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Confirm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TxList.map((tx) => (
                  <TableRow
                    hover
                    key={tx.id}
                  >
                    <TableCell>
                      {
                        username === tx.lender ? <Link to="/profile" style={{ textDecoration: 'none', color: '#1e1e1f' }}>ME</Link> : <Link to={`/profile/${tx.lender_id}`} style={{ textDecoration: 'none', color: '#1e1e1f' }}>{tx.lender}</Link>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        username === tx.borrower ? <Link to="/profile" style={{ textDecoration: 'none', color: '#1e1e1f' }}>ME</Link> : <Link to={`/profile/${tx.borrower_id}`} style={{ textDecoration: 'none', color: '#1e1e1f' }}>{tx.borrower}</Link>
                      }
                    </TableCell>
                    <TableCell>
                      {tx.money}
                      {' '}
                      KRW
                    </TableCell>
                    <TableCell>
                      {
                        tx.completed === false ? (<div style={{ color: '#ff2104' }}>Incomplete</div>) : (<div>Complete</div>)
                      }
                    </TableCell>
                    <TableCell>
                      {
                        tx.completed === true
                        || (tx.lender_confirm === true && username === tx.lender)
                        || (username === tx.borrower && tx.borrower_confirm === true)
                          ? (
                            <div id="confirm-button">
                              <button
                                type="button"
                                onClick={() => onClickBtn(tx.id)}
                                disabled
                              >
                                DONE
                              </button>
                            </div>
                          )
                          : (
                            <div id="confirm-button">
                              <button
                                type="button"
                                onClick={() => onClickBtn(tx)}
                                disabled={isBtnDisabled}
                              >
                                OK
                              </button>
                            </div>
                          )
                      }
                    </TableCell>
                    <Modal open={popUp} onClose={!popUp}>
                      <Modal.Header>Write Review!</Modal.Header>
                      <Modal.Content image>
                        <Image
                          wrapped
                          size="medium"
                          src="data:image/jpeg;base64,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"
                        />
                        <Modal.Description>
                          <Header>리뷰를 남겨서 마음을 표현해주세요.</Header>
                          <input
                            style={{ width: '200%', height: '80%' }}
                            placeholder="review"
                            onChange={handleChange}
                          />
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <MyButton
                          positive
                          icon="checkmark"
                          labelPosition="right"
                          content="Yep, submit!"
                          onClick={() => onSubmit(tx)}
                          disabled={isDisable}
                        />
                      </Modal.Actions>
                    </Modal>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions} />
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
  TxList: PropTypes.string,
  onClickBtn: PropTypes.string,
  isBtnDisabled: PropTypes.string,
  username: PropTypes.string,
  popUp: PropTypes.string,
  handleChange: PropTypes.string,
  onSubmit: PropTypes.string,
  isDisable: PropTypes.string,
};

LatestOrders.defaultProps = {
  className: null,
  TxList: null,
  onClickBtn: null,
  isBtnDisabled: null,
  username: null,
  popUp: null,
  handleChange: null,
  onSubmit: null,
  isDisable: null,
};

export default LatestOrders;
