import React, { PureComponent, Fragment } from 'react';
import Book from '@/view/book';
import CreateAvailableTime from '@/view/availableTime/create';

export default class Index extends PureComponent {
  render() {
    const bookProps = { days: 7, startOfDay: 8, endOfDay: 17, timeRange: 60, multi: true };
    return (
      <Fragment>
        <Book {...bookProps} />
        <CreateAvailableTime />
      </Fragment>
    );
  }
}
