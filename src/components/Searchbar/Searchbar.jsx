import { Component } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export class SearchBar extends Component {
  state = {
    name: '',
    page: 1,
  };

  handlechangeImput = e => {
    const { value } = e.currentTarget;
    this.setState({ name: value });
  };

  handlechangeForm = e => {
    e.preventDefault();

    this.props.onSubmitHandler(this.state);

    if (this.state.name.trim() === '') {
      Notiflix.Notify.warning('Enter something first to search for images!');
      return;
    }
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
