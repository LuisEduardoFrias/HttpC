//
import { FormEvent, useState } from 'react';
import TimeAlert, { aletType, variantType } from './time_alert';
import Loading from './loading';
import useFetch, { Method } from '../hooks/use_fetch';
import '../styles/punch_screen.css';

export default function PunchScreen() {
  const [setFetch, data, loading] = useFetch(import.meta.env.VITE_API_BASE_URL);
  const [isCode, setIsCide] = useState(true);
  //alert(JSON.stringify(data));
  const show = !isCode || data.data || data.error;
  
  const alertData = {
    color:
      (!isCode && aletType.info) ||
      (data.error && aletType.error) ||
      (data.data && aletType.success),
    severity:
      (!isCode && aletType.info) ||
      (data.error && aletType.error) ||
      (data.data && aletType.success),
    message:
      (!isCode && 'Code is required.') ||
      (data.error && 'Access denied.') ||
      (data.data && `${data.data.userName} Approved access.`),
    variant: variantType.filled,
  };

  function handlerSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    if (!formDataObject.fingerprint) {
      setIsCide(!isCode);
      return;
    }

    setFetch({
      url: 'arrival_registration',
      method: Method.POST,
      body: formDataObject,
    });
  }

  return (
    <div className='punch-container'>
      <h1>Punch screen</h1>
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
          <h1></h1>
          <label>Code</label>
          <input
            type='text'
            placeholder='Example: 7251, 6257, 1682 ...'
            disabled={loading}
            name='fingerprint'
          />
          <button
            disabled={loading}
            type='submit'
            className='btn'>
            send
          </button>
        </form>
      </div>
    </div>
  );
}
