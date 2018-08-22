import gql from 'graphql-tag';

export const TIMETABLE_DETAIL = gql`
  query TimetableDetail($_id: String!) {
    timetable: timetable(_id: $_id) {
      __typename
      _id
      title
      cover
      description
      startOfDay
      endOfDay
      startOfHour
      endOfHour
      timeRange
      multi
      times
      createdAt
      user {
        nickname
      }

    }
  }
`;

export const TIMETABLE_LIST = gql`
  query TimetableList($first: Int!, $skip: Int!) {
    list: timetables(first: $first, skip: $skip) {
      __typename
      _id
      title
      createdAt
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


export const DELETE_TIMETABLE = gql`
  mutation ($id: String!) {
    item: deleteTimetable(id: $id) {
      __typename
    }
  }
`;
