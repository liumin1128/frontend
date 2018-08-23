import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { USERINFO } from '@/graphql/user';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'next/router';
import { clearStorage } from '@/utils/store';
import { modalConsumer } from '@/hoc/widthModal';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    padding: 16,
    color: '#fff',
    display: 'flex',
    background: 'rgba(0,0,0,0.5)',
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 16,
    border: '2px #fff solid',
  },
  p: {
    color: '#fff',
    margin: 0,
  },
  logout: {
    fontSize: 12,
    color: '#fff',
    border: '1px rgba(255,255,255,0.5) solid',
    // padding: 2,
    lineHeight: '14px',
    marginLeft: 16,
  },
});

@connect(({ book }) => ({ book }))
@withStyles(styles)
@withRouter
@modalConsumer
export default class ArticleDetail extends PureComponent {
  render() {
    const { classes, router, modal } = this.props;

    const showModal = () => modal(({ close }) => (
      <Fragment>
        <DialogTitle id="alert-dialog-title">
          确认退出？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            退出后需要重新登录才可以继续操作
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              close();
              clearStorage();
              window.location.href = '/';
            }}
            color="primary"
            autoFocus
          >
            确认
          </Button>
        </DialogActions>
      </Fragment>
    ));

    return (
      <Query query={USERINFO}>
        {({ loading, error, data = {} }) => {
          const { user = {} } = data;
          // console.log('user');
          // console.log(user);
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <Fragment>
              <div className={classes.root}>
                <Avatar className={classes.avatar} src="/static/images/avatar.jpeg" />
                <div>
                  <Typography className={classes.p} variant="title" gutterBottom>
                    {user.nickname}
                    <Button
                      onClick={showModal}
                      className={classes.logout}
                      variant="outlined"
                      component="span"
                    >
                      logout
                    </Button>
                  </Typography>
                  <Typography className={classes.p} variant="Subheading" gutterBottom>
                    {user.username}
                  </Typography>
                </div>
              </div>
            </Fragment>

          );
        }}
      </Query>
    );
  }
}
