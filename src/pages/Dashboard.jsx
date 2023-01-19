import AccountBalance from '../components/Account/AccountBalance';
import { v4 as uuidv4 } from 'uuid';
import style from './Dashboard.module.scss';
import { useSelector } from 'react-redux';
import { userFirstNameSelect, userLastNameSelect } from '../utils/selectors';
import { useApiAccounts, useApiUpdateData, useApiUserInfos } from '../hooks/useApi';
import { useEffect, useState } from 'react';

/**
 * Dashboard detail page displaying user info and an overview
 * of all accounts owned by the user.
 * @component
 * @example
 * return (
 *  <Dashboard />
 * )
 */
export default function Dashboard() {

  // Get accounts list
  const accounts = useApiAccounts();

  // Get basic user's info
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

  // Edit form values
  const [formValues, setFormValues] = useState({});

  // Update basic user's info in redux state and database
  useApiUpdateData(newUserData.firstName, newUserData.lastName);

  // Toggle edition mode status.
  const handleEdit = () => {
    setEditing(!isEditing);
  }

  // Controller for user's first name and last name.
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  // Save modifications
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setNewUserData({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    });
    handleEdit();
  }

  // Discard changes and reset local state values.
  const handleDiscardChanges = () => {
    handleEdit();
    setFormValues(initialState);
  }

  useEffect(() => {
    // Set default data with current user's info.
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
      {accounts && accounts.map((account) => (
        <AccountBalance
          key={uuidv4()}
          title={account.name}
          serial={account.serialNumber}
          amount={account.balance}
          desc={account.desc}
          id={account.id}
        />
      ))}
    </main>
  );
}
