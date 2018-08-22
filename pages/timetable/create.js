import React, { PureComponent, Fragment } from 'react';
import CreateAvailableTime from '@/view/availableTime/create';
import Layout from '@/components/layout';

export default class Index extends PureComponent {
  render() {
    return (
      <Fragment>
        <Layout>
          <CreateAvailableTime />
        </Layout>
      </Fragment>
    );
  }
}
