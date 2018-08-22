import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { TIMETABLE_LIST } from '@/graphql/timetable';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

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
      <Query query={TIMETABLE_LIST} variables={{ skip: 0, first: 999 }}>
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
                        primary={i.title}
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
