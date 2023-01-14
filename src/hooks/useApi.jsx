import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginPending, loginSuccess, updateUserData } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { tokenSelect } from '../utils/selectors';

/**
 * The API URL.
 * @type {string}
 */
const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

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
          userEmail: userInfos.data.body.email,
        }))
      } catch (error) {
        console.log(error.message);
        localStorage.removeItem('jwtToken');
        navigate('/login');
      }
    }

    getData();
  }, [token, navigate, dispatch]);
}
