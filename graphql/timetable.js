import gql from 'graphql-tag';

export const TIMETABLE_DETAIL = gql`
  query TimetableDetail($_id: String!) {
    timetable: timetable(_id: $_id) {
      __typename
      _id
      title
    }
  }
`;

export const TIMETABLE_LIST = gql`
  query TimetableList($first: Int!, $skip: Int!) {
    list: timetables(first: $first, skip: $skip) {
      __typename
      _id
      title
    }
    meta: _timetablesMeta {
      count
    }
  }
`;

export const CREATE_TIMETABLE = gql`
  mutation ($input: TimetableInput) {
    item: createTimetable(input: $input) {
      __typename
      _id
      title
    }
  }
`;
