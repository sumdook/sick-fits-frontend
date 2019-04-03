import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { perPage } from '../config';
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export default function Pagination({ page }) {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>loading...</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                SickFits! Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                Prev
              </a>
            </Link>
            <p>
              Page {page} of {pages}
            </p>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page + 1 }
              }}
            >
              <a className="prev" aria-disabled={page >= pages}>
                Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
}
