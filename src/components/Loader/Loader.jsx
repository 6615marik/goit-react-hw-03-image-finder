import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Circless = () => {
  return (
    <div className={css.loader}>
      <Circles
        height="80"
        width="80"
        color="#40b63e"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
