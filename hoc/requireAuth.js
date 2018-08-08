import React, { PureComponent, Fragment } from 'react';

export default class Auth extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}
