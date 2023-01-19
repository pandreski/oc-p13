import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginPending, loginSuccess, setAuth, updateEmail, updateUserData } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { tokenSelect } from '../utils/selectors';
import AccountsModel from '../models/accounts';
import AccountModel from '../models/account';
import TransactionsModel from '../models/transactions';
import CategoriesModel from '../models/categories';

/**
 * The API URL.
 * @type {string}
 */
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Axios instance.
 * @returns {AxiosInstance}
 */
const instance = axios.create({
  baseURL: apiUrl,
});

/**
 * Hook for API user authentication.
 * @param {String} email          User's email
 * @param {String} password       User's password
 * @param {Boolean} isPersistent  "Remember me" option
 */
export function useApiAuth(email, password, isPersistent) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email || !password) return;

    async function getData() {
      try {
        const auth = await instance.post('/user/login', {
          email,
          password
        });
        const token = await auth.data.body.token;
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Store token in localStorage if "Remember me" box is checked.
        if (isPersistent) {
          localStorage.setItem('jwtToken', token);
        }

        dispatch(loginSuccess(token));
      } catch (error) {
        console.error(error);
        dispatch(loginFailed(error.response.data.message));
      }
    }

    dispatch(loginPending());
    getData();
  }, [dispatch, email, password, isPersistent]);
}

/**
 * Hook for defining user's info in the redux state.
 */
export function useApiUserInfos() {
  const stateToken = useSelector(tokenSelect);
  const token = localStorage.getItem('jwtToken') || stateToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    async function getData() {
      try {
        const userInfos = await instance.post('/user/profile');
        dispatch(updateUserData({
          userFirstName: userInfos.data.body.firstName,
          userLastName: userInfos.data.body.lastName,
        }));
        dispatch(updateEmail(userInfos.data.body.email));
        dispatch(setAuth());
      } catch (error) {
        console.log(error.message);
        localStorage.removeItem('jwtToken');
        navigate('/login');
      }
    }

    getData();
  }, [token, navigate, dispatch]);
}

/**
 * Hook for updating user's info in the redux state.
 * @param {String} firstName  User's first name
 * @param {String} lastName   User's last name
 */
export function useApiUpdateData(firstName, lastName) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function setData() {
      if (!firstName || !lastName) return;
      try {
        await instance.put('/user/profile', {
          firstName,
          lastName,
        });
        dispatch(updateUserData({
          userFirstName: firstName,
          userLastName: lastName,
        }))
      } catch (error) {
        console.log(error.message);
      }
    }

    setData();
  }, [firstName, lastName, dispatch]);
}

/**
 * Hook for getting all accounts info from mocked data.
 * @returns {Object[]} Accounts
 */
export function useApiAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('/__mocks__/accounts.json');
        const model = new AccountsModel(res.data);
        setAccounts(model.getAll);
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();
  }, [])

  return accounts;
}

/**
 * Hook for getting a specific account info from mocked data.
 * @param {String} id Account ID
 * @returns {Object} Account data
 */
export function useApiAccount(id) {
  const [account, setAccount] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('/__mocks__/accounts.json');
        const model = new AccountModel(Object.values(res.data).find((elem) => elem.id === id));
        setAccount(model.getAccount);
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();
  }, [])

  return account;
}

/**
 * Hook for getting all transactions from mocked data.
 * @param {String} accountId Account ID
 * @returns {Object[]} Transactions list
 */
export function useApiTransactions(accountId) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('/__mocks__/transactions.json');
        const model = new TransactionsModel(Object.values(res.data).filter((elem) => elem.account === accountId));
        setTransactions(model.getTransactions);
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();
  }, [])

  return transactions;
}

/**
 * Hook for getting all categories from mocked data.
 * @returns {Object[]} Categories list
 */
export function useApiCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('/__mocks__/categories.json');
        const model = new CategoriesModel(res.data);
        setCategories(model.getCategories);
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();
  }, [])

  return categories;
}
