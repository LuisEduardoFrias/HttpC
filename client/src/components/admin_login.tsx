//
import { FormEvent, useState, useEffect } from 'react';
import TimeAlert, { aletType, variantType } from './time_alert';
import Loading from './loading';
import useLocalStorage from '../hooks/use_storage'
import { dispatch } from 'subscribe_state';
import useFetch, { Method } from '../hooks/use_fetch';
import '../styles/login.css'

export default function AdminLogin() {
  const [v, g, setter] = useLocalStorage();
  const [setFetch, data, loading] = useFetch(import.meta.env.VITE_API_BASE_URL);
  const [isCode, setIsCide] = useState(true);

  const show = !isCode || data.error;

  useEffect(() => {
    if (data.data?.token) {
      dispatch({ type: "activateAccess", token: data.data?.token })
      setter({ key: 'token', value: data.data?.token })
    }
  }, [data])

  const alertData = {
    color:
      (!isCode ? aletType.info : aletType.error),
    severity:
      (!isCode ? aletType.info : aletType.error),
    message:
      (!isCode ? 'filds are required.' : 'Access denied.'),
    variant: variantType.filled,
  };

  function handlerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    if (!formDataObject.user || !formDataObject.password) {
      setIsCide(!isCode);
      return;
    }

    setFetch({
      url: 'register/login',
      method: Method.POST,
      body: formDataObject,
    });
  }

  return (
    <div className='login-container'>
      <h1>Admin login</h1>
      {loading && <Loading />}
      <TimeAlert
        key='TimeAlert'
        show={show}
        alertData={alertData}
        exe={() => {
          setIsCide(true);
        }}
      />
      <div>
        <form onSubmit={handlerSubmit}>
          <label>
            User
            <input
              placeholder='Example: Admmin.S'
              name='user'
            />
          </label>
          <label>
            Password
            <input
              placeholder='Example: ***Adm***'
              name='password'
            />
          </label>
          <button className='btn'>
            send
          </button>
        </form>
      </div>
    </div>
  );
}
