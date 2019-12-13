import React from 'react';
import BeautyStars from 'beauty-stars';
import PropTypes from 'prop-types';

const Presenter = (props) => <BeautyStars value={props.rating} size={120} />;

export default Presenter;

Presenter.propTypes = {
  rating: PropTypes.string,
};

Presenter.defaultProps = {
  rating: null,
};
