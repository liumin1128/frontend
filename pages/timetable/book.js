import React, { PureComponent, Fragment } from 'react';
import { CREATE_TIMETABLE } from '@/graphql/timetable';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@/components/snackbar';
import Book from '@/view/book';
import { modalConsumer } from '@/hoc/widthModal';
import TimetableView from '@/view/timetable/result';
import pp from '@/hoc/pp';
import Form from '@/view/availableTime/createBook';

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
      ibooktimes: this.props.ibooktimes,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Mutation mutation={CREATE_TIMETABLE}>
        {(createTimetable, { loading, error, data = {} }) => {
          const onSubmit = async (values) => {
            const { ibooktimes } = this.props;


            const input = {
              ...values,
              times: JSON.stringify(ibooktimes),
            };

            console.log(input);


            return false;


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
              // Snackbar.error('文章发布失败');
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
                      Router.push('/book/setting');
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    选择可用时间
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className={classes.root}>

                <Card>
                  <CardContent>
                    <Form onSubmit={onSubmit} />
                  </CardContent>
                </Card>
              </div>

            </Fragment>
          );
        }}
      </Mutation>
    );
  }
}
