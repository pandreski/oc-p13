import { useParams } from 'react-router-dom';
import Collapse from '../components/Account/Collapse';
import HeadingBanner from '../components/Account/HeadingBanner';
import { useApiTransactions } from '../hooks/useApi';

function Account() {
  const { id } = useParams()

  // const accountInfos = useApiAccount(id); // infos de base du compte
  const transactions = useApiTransactions(id) // toutes les transactions du compte
  // const categories = useApiCategories(); // toutes les categories

  return (
    <main className="main bg-dark">
      <HeadingBanner id={id} />
      <Collapse />
    </main>
  );
}

export default Account;
