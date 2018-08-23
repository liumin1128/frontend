import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

@connect(({ user }) => ({ user }))
@withRouter
export default class Index extends PureComponent {
  componentDidMount() {
    const { dispatch, router } = this.props;
    const { token } = router.query || {};

    if (token) {
      dispatch({
        type: 'user/loginByOauth',
        payload: { token },
      });
    }
  }

  render() {
    return (
      <Fragment>
        Successful user login
      </Fragment>
    );
  }
}
