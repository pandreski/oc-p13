import AccountBalance from '../components/AccountBalance';
import { v4 as uuidv4 } from 'uuid';
import style from './Dashboard.module.scss';
import { useSelector } from 'react-redux';
import { userFirstNameSelect, userLastNameSelect } from '../utils/selectors';
import { useApiUpdateData, useApiUserInfos } from '../hooks/useApi';
import { useEffect, useState } from 'react';

export default function Dashboard() {
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

  useApiUserInfos();
  const [isEditing, setEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
  });
  const userFirstName = useSelector(userFirstNameSelect);
  const userLastName = useSelector(userLastNameSelect);
  const initialState = {
    firstName: userFirstName,
    lastName: userLastName,
  };

  const [formValues, setFormValues] = useState({});

  useApiUpdateData(newUserData.firstName, newUserData.lastName);

  const handleEdit = () => {
    setEditing(!isEditing);
  }

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setNewUserData({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    });
    handleEdit();
  }

  const handleDiscardChanges = () => {
    handleEdit();
    setFormValues(initialState);
  }

  useEffect(() => {
    setFormValues({
      firstName: userFirstName,
      lastName: userLastName,
    })
  }, [userFirstName, userLastName]);

  return (
    <main className="main bg-dark">
      <div className={style.header}>
        <h1>
          Welcome back<br />
          {
            isEditing ? (
              <form onSubmit={handleSubmit}>
                <label htmlFor="firstName" className='sr-only'>First name</label>
                <input
                  className={`${style.input} ${style.xMargin}`}
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="lastName" className='sr-only'>Last name</label>
                <input
                  className={`${style.input} ${style.xMargin}`}
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <button className={`${style.editButton} ${style.xMargin}`} type="submit">Save</button>
                  <button className={`${style.editButton} ${style.xMargin}`} type="button" onClick={handleDiscardChanges}>Cancel</button>
                </div>
              </form>
            ) : (
              `${userFirstName} ${userLastName}!`
            )
          }
        </h1>
        {!isEditing && <button className={style.editButton} onClick={handleEdit}>Edit Name</button>}
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
