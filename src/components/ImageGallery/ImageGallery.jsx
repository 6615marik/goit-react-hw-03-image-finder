import { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  render() {
    return <ul className={css.list}>{this.props.children}</ul>;
  }
}

ImageGallery.propTypes = {
  children: PropTypes.node,
};
