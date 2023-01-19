import { useApiAccount } from '../../hooks/useApi';
import PropTypes from 'prop-types';
import style from './HeadingBanner.module.scss';

/**
 * Component displaying a banner with the balance's information.
 * @component
 * @example
 * const id = '3'; // Account ID
 * return (
 *  <HeadingBanner id={id} />
 * )
 */
export default function HeadingBanner({ id }) {
  // Get given account's data
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
