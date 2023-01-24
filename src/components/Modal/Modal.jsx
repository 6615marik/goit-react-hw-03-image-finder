import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
// import { render } from '@testing-library/react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdpropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <div className={css.backdrop} onClick={this.handleBackdpropClick}>
        <div className={css.modal}>
          <img src={url} alt={alt} />
          <button className={css.btn} onClick={this.handleBackdpropClick}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func,
};
