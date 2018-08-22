import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getStorage, setStorage } from '@/utils/store';
import { STORE_USER_KEY, PATH_BEFORLOGIN } from '@/constants/base';
import Button from '@material-ui/core/Button';
import Layout from '@/components/layout';
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
          <Layout>
            <div style={{ padding: 50 }}>
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
