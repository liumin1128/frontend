import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

@connect(({ user }) => ({ user }))
export default class Auth extends PureComponent {
  render() {
    const { children, user } = this.props;

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
