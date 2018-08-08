import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { TIMETABLE_DETAIL } from '@/graphql/timetable';

export default class ArticleDetail extends PureComponent {
  render() {
    const _id = this.props.query._id;
    return (
      <Query query={TIMETABLE_DETAIL} variables={{ _id }}>
        {({ loading, error, data = {} }) => {
          const { article = {} } = data;
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {article.title}
            </div>
          );
        }}
      </Query>
    );
  }
}
