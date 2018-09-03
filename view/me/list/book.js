import React, { PureComponent, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { BOOK_LIST, DELETE_BOOK } from '@/graphql/book';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { modalConsumer } from '@/hoc/widthModal';

const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: '92px auto 32px',
  },
  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
    padding: '16px 32px',
  },
});

@connect(({ book }) => ({ book }))
@withStyles(styles)
@modalConsumer
export default class BookList extends PureComponent {
  render() {
    const { modal } = this.props;
    return (
      <Query query={BOOK_LIST} variables={{ skip: 0, first: 999 }}>
        {({ loading, error, data = {} }) => {
          const { list } = data;
          // console.log('list');
          // console.log(list);
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <Mutation mutation={DELETE_BOOK}>
              {(deleteBook, { loading, error }) => {
                const onDelete = async (id) => {
                  const result = await deleteBook({ variables: { id }, refetchQueries: ['BookList'] });
                  console.log('result');
                  console.log(result);
                };
                const showModal = id => modal(({ close }) => (
                  <Fragment>
                    <DialogTitle id="alert-dialog-title">
                      do you want to cancel this booking？
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        delete
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={close} color="primary">
                        cancel
                      </Button>
                      <Button
                        onClick={() => {
                          onDelete(id);
                          close();
                        }}
                        color="primary"
                        autoFocus
                      >
                        delete booking
                      </Button>
                    </DialogActions>
                  </Fragment>
                ));
                return (
                  <Fragment>
                    <List>
                      {
                        list.map(i => (
                          <ListItem onClick={() => showModal(i._id)}>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                            <ListItemText
                              primary={`i booked the meeting：${i.timetable ? i.timetable.title : '活动已删除'}`}
                              secondary={moment(i.createdAt).format('llll')}
                            />
                          </ListItem>
                        ))
                      }
                    </List>
                  </Fragment>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
