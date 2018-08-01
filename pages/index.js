import React, { PureComponent, Fragment } from 'react';
// import Book from '@/view/book';
import CreateAvailableTime from '@/view/availableTime/create';

export default class Index extends PureComponent {
  render() {
    return (
      <Fragment>
        <CreateAvailableTime />
      </Fragment>
    );
  }
}
