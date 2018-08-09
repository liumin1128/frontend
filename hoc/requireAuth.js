import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getStorage, setStorage } from '@/utils/store';
import { STORE_USER_KEY, PATH_BEFORLOGIN } from '@/constants/base';
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
          <div style={{ padding: 50 }}>
            please
            <a href="http://localhost:3101/oauth/outlook">
              login account
            </a>
          </div>
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
