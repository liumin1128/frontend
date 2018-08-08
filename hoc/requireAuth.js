import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

@connect(({ user }) => ({ user }))
@withRouter
export default class Auth extends PureComponent {
  render() {
    const { children, user, router = {} } = this.props;

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
      return (
        <Fragment>
          <div style={{ padding: 50 }}>
            请先
            <a href="http://localhost:3101/oauth/outlook">
              登录
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
