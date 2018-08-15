import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { TIMETABLE_DETAIL } from '@/graphql/timetable';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Book from '../book/book';


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
export default class ArticleDetail extends PureComponent {
  render() {
    const _id = this.props.query._id;
    const { classes, book = {} } = this.props;
    const { ibooktimes = {} } = book;
    const buttonActive = Object.keys(ibooktimes).length > 0;
    return (
      <Query query={TIMETABLE_DETAIL} variables={{ _id }}>
        {({ loading, error, data = {} }) => {
          const { timetable = {} } = data;
          console.log('timetable');
          console.log(timetable);
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <Fragment>
              <AppBar position="fixed" className={classes.appbar}>

                <Toolbar>
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => {
                      Router.push('/book/setting');
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    {timetable.title}
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className={classes.root}>

                <Card>
                  <CardContent>
                    <br />

                    <Typography variant="title" color="inherit" className={classes.flex}>
                     meeting title:
                      {timetable.title}
                    </Typography>
                    <br />
                    <Typography variant="subheading" gutterBottom>
                      introduction:
                      {timetable.description}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                      time：
                      {`${timetable.startOfDay} ~ ${timetable.endOfDay}`}
                    </Typography>

                    <Book
                      onChange={(value) => {
                        const { dispatch } = this.props;
                        dispatch({
                          type: 'book/save',
                          payload: {
                            ibooktimes: value,
                          },
                        });
                      }}
                      setting={timetable}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submitButton}
                      disabled={!buttonActive}
                      onClick={() => {
                        Router.push(`/timetable/book?_id=${_id}`);
                      }}
                    >
                      submit
                    </Button>
                  </CardContent>
                </Card>
              </div>


            </Fragment>

          );
        }}
      </Query>
    );
  }
}
