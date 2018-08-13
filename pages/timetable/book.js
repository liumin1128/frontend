import React, { PureComponent, Fragment } from 'react';
import { CREATE_BOOK } from '@/graphql/book';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { withRouter } from 'next/router';
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
import pp from '@/hoc/pp';
import Form from '@/view/availableTime/createBook';
import { create } from 'domain';

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
                      预订成功！通知已发送到您的邮箱！
                    </Typography>
                  </CardContent>
                </Card>
              ));

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
