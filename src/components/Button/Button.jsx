import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button({ onButtonClick }) {
  return (
    <div className={css.btn_div}>
      <button className={css.btn} type="button" onClick={onButtonClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onButtonClick: PropTypes.func,
};
