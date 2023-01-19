import { useParams } from 'react-router-dom';
import Collapse from '../components/Account/Collapse';
import HeadingBanner from '../components/Account/HeadingBanner';
import { useApiTransactions } from '../hooks/useApi';
import { v4 as uuidv4 } from 'uuid';

export default function Account() {
  const { id } = useParams()

  // All account's transactions
  const transactions = useApiTransactions(id);

  return (
    <main className="main bg-dark">
      <HeadingBanner id={id} />
      {
        transactions.map((transaction) => (
          <Collapse
            key={uuidv4()}
            date={transaction.date}
            amount={transaction.amount}
            balance={transaction.balance}
            label={transaction.description}
            category={transaction.category}
            notes={transaction.notes}
            type={transaction.type}
          />
        ))
      }
    </main>
  );
}
