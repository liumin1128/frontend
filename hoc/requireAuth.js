import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getStorage, setStorage } from '@/utils/store';
import { STORE_USER_KEY, PATH_BEFORLOGIN } from '@/constants/base';
import Button from '@material-ui/core/Button';
import Layout from '@/components/layout';
import Typography from '@material-ui/core/Typography';
import nossr from './nossr';


@nossr
@connect(({ user }) => ({ user }))
@withRouter
export default class Auth extends PureComponent {
  render() {
    const { dispatch, children, user, router = {} } = this.props;

    // console.log('this.props');
    // console.log(this.props);

    if (router.pathname === '/login/oauth') {
      return (
        <Fragment>
          {children}
        </Fragment>
      );
    }


    if (!user || !user.token) {
      setStorage(PATH_BEFORLOGIN, router.asPath);
      const { token } = getStorage(STORE_USER_KEY) || {};

      // console.log('token');
      // console.log(token);

      if (token) {
        dispatch({
          type: 'user/loginByOauth',
          payload: { token },
        });
        return (
          <div>
          login account
          </div>
        );
      }

      return (
        <Fragment>
          <Layout noAuth>
            <div style={{ padding: 24 }}>
              <Typography style={{ color: '#999' }} variant="Subheading" gutterBottom>
                尚未登录，请点击登录再进行操作...
              </Typography>
              <br />
              <a href="http://localhost:3101/oauth/outlook">
                <Button color="primary" size="large">
                  Login
                </Button>
              </a>
            </div>
          </Layout>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}
