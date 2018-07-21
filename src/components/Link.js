import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Link = ({ active, children, onClick }) => {
  const hreff = children.toLowerCase();
  let href = '#/';
  if (hreff !== 'all') { href = href + hreff; }
  return (
    <a
      href={ href }
      className={ ClassNames({ selected: active }) }
      onClick={ e => {
          onClick();
      } }>
      { children }
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
