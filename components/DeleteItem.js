import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';
const DELETE_SINGLE_ITEM = gql`
  mutation DELETE_SINGLE_ITME($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default class DeleteItem extends Component {
  deleteItem = async deleteItemMutation => {
    const res = await deleteItemMutation({
      variables: {
        id: this.props.id
      }
    });
  };

  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    return (
      <Mutation mutation={DELETE_SINGLE_ITEM} update={this.update}>
        {(deleteItem, { error }) => {
          return (
            <button onClick={() => this.deleteItem(deleteItem)}>
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}
