import AccountBalance from '../components/AccountBalance';
import { v4 as uuidv4 } from 'uuid';
import style from './Dashboard.module.scss';

function Dashboard() {
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "2,082.79",
      desc: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "10,928.42",
      desc: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "184.30",
      desc: "Current Balance",
    },
  ];

  return (
    <main className="main bg-dark">
      <div className={style.header}>
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className={style.editButton}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <AccountBalance
          key={uuidv4()}
          title={account.title}
          amount={account.amount}
          desc={account.desc}
        />
      ))}
    </main>
  );
}

export default Dashboard;
