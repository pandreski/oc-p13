import PropTypes from 'prop-types';
import style from './AccountBalance.module.scss';

/**
 * Component displaying an account's balance preview.
 * @component
 * @example
 * const title = 'Account title';
 * const amount = '2,082.78';
 * const desc = 'Lorem ipsum dolor sit amet...';
 * return (
 *  <AccountBalance title={title} amount={amount} desc={desc} />
 * )
 */
function AccountBalance({ title, amount, desc }) {
  return (
    <section className={style.account}>
      <div className={style.accountContentWrapper}>
        <h3 className={style.accountTitle}>{title}</h3>
        <p className={style.accountAmount}>&#36;{amount}</p>
        <p className={style.accountAmountDescription}>{desc}</p>
      </div>
      <div className={`${style.accountContentWrapper} ${style.cta}`}>
        <button className={style.transactionButton}>View transactions</button>
      </div>
    </section>
  );
}

AccountBalance.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default AccountBalance;
