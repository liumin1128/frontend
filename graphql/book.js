import gql from 'graphql-tag';

export const BOOK_DETAIL = gql`
  query BookDetail($_id: String!) {
    book: book(_id: $_id) {
      __typename
      _id
      description
      timetable {
        _id
        title
      }
    }
  }
`;

export const BOOK_LIST = gql`
  query BookList($first: Int!, $skip: Int!) {
    list: books(first: $first, skip: $skip) {
      __typename
      _id
      createdAt
      timetable {
        _id
        title
      }
    }
    meta: _booksMeta {
      count
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation ($input: BookInput) {
    item: createBook(input: $input) {
      __typename
      _id
      timetable {
        _id
        title
      }
    }
  }
`;
