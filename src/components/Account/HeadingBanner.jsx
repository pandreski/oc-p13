import { useApiAccount } from '../../hooks/useApi';
import PropTypes from 'prop-types';
import style from './HeadingBanner.module.scss';

export default function HeadingBanner({ id }) {
  const account = useApiAccount(id);

  return (
    <div className={style.wrapper}>
      <div>{account.name} ({account.serialNumber})</div>
      <div className={style.balance}>&#36;{account.balance}</div>
      <div>{account.desc}</div>
    </div>
  );
}

HeadingBanner.propTypes = {
  id: PropTypes.string.isRequired
};
