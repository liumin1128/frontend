import React, { PureComponent, Fragment } from 'react';
import { CREATE_TIMETABLE } from '@/graphql/timetable';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Book from '@/view/book';
import { modalConsumer } from '@/hoc/widthModal';
import TimetableView from '@/view/timetable/result';
import pp from '@/hoc/pp';
import Layout from '@/components/layout';

const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: '92px auto 32px',
  },
  appbar: {
    // borderRadius: 5,
  },
  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
    // padding: '16px 32px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tip: {
    fontSize: 10,
    color: '#999',
    marginBottom: 8,
  },
});

@connect(({ book }) => ({ ...book }))
@withStyles(styles)
@modalConsumer
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      times: this.props.times,
      setting: this.props.setting,
    };
  }

  onChange = (values) => {
    console.log('values');
    console.log(values);
    this.setState({ times: values });
    const { dispatch } = this.props;
    dispatch({
      type: 'book/save',
      payload: {
        times: values,
      },
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Mutation mutation={CREATE_TIMETABLE}>
          {(createTimetable, { loading, error, data = {} }) => {
            const onSubmit = async () => {
              const { times, setting } = this.state;

              const input = {
                ...setting,
                times: JSON.stringify(times),
              };

              try {
                const { data } = await createTimetable({
                  variables: { input },
                  refetchQueries: ['TimetableList'],
                });

                const { modal } = this.props;

                modal(pp(TimetableView, { timetable: data.item }));


              // console.log('result');
              // console.log(result);
              // Router.push('/article');
              } catch (err) {
                console.log('err');
                console.log(err);
              // Snackbar.error('文章发');
              }
            };

            return (
              <Fragment>

                <AppBar position="fixed" className={classes.appbar}>

                <Toolbar>
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => {
                      Router.push('/timetable/create');
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                  Select available time
                  </Typography>
                </Toolbar>
              </AppBar>

                <div className={classes.root}>
                <div className={classes.tip}>
                Click to select the available time period
                click and drag to select more than one at a time
                </div>
                <Card>
                  <CardContent>
                    <Book onChange={this.onChange} />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submitButton}
                      onClick={onSubmit}
                    >
                    I have chosen the time
                    </Button>
                  </CardContent>
                </Card>
              </div>

              </Fragment>
            );
          }}
        </Mutation>
      </Layout>
    );
  }
}
