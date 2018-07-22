import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts }) => (
  <ul>
    { posts.map((post, idx) => (
      <li key={ idx }>{ post.title }</li>
    )) }
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts;
