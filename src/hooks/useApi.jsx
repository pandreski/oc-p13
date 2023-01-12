import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailed, loginPending, loginSuccess } from '../features/user/userSlice';

/**
 * The API URL.
 * @type {string}
 */
const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

export function useApiAuth(email, password) {
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

        const userInfos = await instance.post('/user/profile');

        dispatch(loginSuccess({
          token,
          userFirstName: userInfos.data.body.firstName,
          userLastName: userInfos.data.body.lastName,
          userEmail: userInfos.data.body.email,
        }));
      } catch (error) {
        console.error(error);
        dispatch(loginFailed(error.response.data.message));
      }
    }

    dispatch(loginPending());
    getData();
  }, [dispatch, email, password]);
}

// export function useApiUserInfos() {
//   const dispatch = useDispatch();
//   const token = useSelector(getToken);

//   useEffect(() => {
//     if (!token.length) return;

//     async function getData() {
//       try {
//         // S'assurer que le token setté au login est toujours dans l'instance axios à ce moment là...
//         const res = await instance.post('/user/profile');
//         console.log(res);

//         dispatch(updateUserInfo({
//           userFirstName: res.data.body.firstName,
//           userLastName: res.data.body.lastName,
//           userEmail: res.data.body.email,
//         }));
//       } catch (error) {
//         dispatch(loginFailed(error.response.data.message));
//       }
//     }

//     getData();
//   }, [dispatch, token])
// }
