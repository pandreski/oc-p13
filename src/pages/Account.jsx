import { useParams } from 'react-router-dom';

function Account() {
  const { id } = useParams()

  // const accountInfos = useApiAccount(id); // infos de base du compte
  // const transactions = useApiTransactions(id) // toutes les transactions du compte
  // const categories = useApiCategories(); // toutes les categories

  return (
    <div>
      Account {id}
    </div>
  );
}

export default Account;
