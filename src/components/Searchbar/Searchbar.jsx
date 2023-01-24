import { Component } from 'react';
import Notiflix from 'notiflix';

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

    this.props.onSubmit(this.state);
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
      <header className="searchbar">
        <form className="form" onSubmit={this.handlechangeForm}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            value={this.state.name}
            className="input"
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
