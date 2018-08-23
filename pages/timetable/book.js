import React, { PureComponent, Fragment } from 'react';
import { CREATE_BOOK } from '@/graphql/book';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { withRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { modalConsumer } from '@/hoc/widthModal';
import Form from '@/view/availableTime/createBook';
import Layout from '@/components/layout';


const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: '0px auto 0px',
  },
  appbar: {
  },
  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
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
@withRouter
@modalConsumer
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ibooktimes: this.props.ibooktimes,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Mutation mutation={CREATE_BOOK}>
          {(createBook, { loading, error, data = {} }) => {
            const onSubmit = async (values) => {
              const { ibooktimes, router } = this.props;


              const input = {
                ...values,
                timetable: router.query._id,
                times: JSON.stringify(ibooktimes),
              };

              console.log(input);


              try {
                const { data } = await createBook({
                  variables: { input },
                  refetchQueries: ['TimetableList'],
                });

                const { modal } = this.props;


                console.log('data');
                console.log(data);

                modal(() => (
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                      your meeting is booked！The confirmation email has been sent ！
                      </Typography>
                    </CardContent>
                  </Card>
                ));
              } catch (err) {
                console.log('err');
                console.log(err);
              }
            };

            const { router } = this.props;

            return (
              <Fragment>

                <AppBar position="static" className={classes.appbar}>

                  <Toolbar>
                    <IconButton
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Menu"
                      onClick={() => {
                        Router.push(`/timetable/detail?_id=${router.query._id}`);
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                    choose your availableTime
                    </Typography>
                  </Toolbar>
                </AppBar>

                <div className={classes.root}>

                  <CardContent>
                    <Form onSubmit={onSubmit} />
                  </CardContent>
                </div>

              </Fragment>
            );
          }}
        </Mutation>
      </Layout>
    );
  }
}
