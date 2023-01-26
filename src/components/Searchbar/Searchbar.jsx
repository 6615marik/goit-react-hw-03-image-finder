import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export class SearchBar extends Component {
  state = {
    name: '',
  };

  handlechangeImput = e => {
    const { value } = e.currentTarget;
    this.setState({ name: value.toLowerCase() });
  };

  handlechangeForm = e => {
    e.preventDefault();

    if (this.state.name.trim() === '') {
      Notiflix.Notify.warning('Enter something first to search for images!');
      return;
    }
    // console.log(this.state);
    this.props.onSubmitHandler(this.state.name);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handlechangeForm}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            value={this.state.name}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handlechangeImput}
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
