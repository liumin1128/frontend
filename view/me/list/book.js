import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import { BOOK_LIST } from '@/graphql/book';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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
export default class TimetableList extends PureComponent {
  render() {
    return (
      <Query query={BOOK_LIST} variables={{ skip: 0, first: 999 }}>
        {({ loading, error, data = {} }) => {
          const { list } = data;
          console.log('list');
          console.log(list);
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <Fragment>
              <List>
                {
                  list.map(i => (
                    <ListItem>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText
                        primary={`已参加：${i.timetable.title}`}
                        secondary={moment(i.createdAt).format('llll')}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
