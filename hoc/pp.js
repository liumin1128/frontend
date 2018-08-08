import React, { PureComponent } from 'react';

export default function (WrappedComponent, props) {
  return class extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} {...props} />;
    }
  };
}
