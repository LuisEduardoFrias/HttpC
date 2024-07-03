//
import { useState, useEffect } from 'react';
import useFetch, { Method } from '../hooks/use_fetch';
import TimeAlert, { aletType, variantType } from './time_alert';
import Loading from './loading';
import TableX from './table';
import '../styles/arrivel_registration.css';

export default function EmployeList({ token }: { token: string }) {
  const [setFetch, data, loading] = useFetch(import.meta.env.VITE_API_BASE_URL);
  const [show, setShow] = useState(false)

  const alertData = {
    color: aletType.error,
    severity: aletType.error,
    message: data.error,
    variant: variantType.filled,
  };

  useEffect(() => {
    setFetch({
      url: `employed/${token}`,
    });
  }, [])

  useEffect(() => {
    if (data.error)
      setShow(!!data.error)
  }, [data.error])


  return (
    <div className='arrivel-reg-container'>
      <h2>Employe List</h2>
      {loading && <div style={{ width: '50px', height: '50px' }}><Loading /></div>}
      <TimeAlert
        key='TimeAlert'
        show={show}
        alertData={alertData}
        exe={() => {
          setShow(false);
        }}
      />
      <TableX data={data.data} headers={["Id", "Finger print", "User CardId","User Name", "User LastName"]} />
    </div>
  );
}
