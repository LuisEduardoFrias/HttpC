//
import { useState, useEffect, ReactElement } from 'react';
import useFetch, { Method } from '../hooks/use_fetch';
import TimeAlert, { aletType, variantType } from './time_alert';
import Loading from './loading';

export { Method };

export type DataResult = {
  error: any,
  data: any,
}

type TFormProps<T> = {
  url: string,
  method: Method,
  message: (obj: object, isEmpty: boolean) => string,
  validationEmptyFild: (value: T) => boolean,
  children: ReactElement
}

export default function Form<T>({ url, method, message, validationEmptyFild, children }: TFormProps<T>) {
  const [setFetch, data, loading] = useFetch(import.meta.env.VITE_API_BASE_URL);
  const [isEmpty, setIsEmpty] = useState(false);
  
  const show = isEmpty || data.data || data.error;

  const alertData = {
    color:
      (isEmpty && aletType.info) ||
      (data.error && aletType.error) ||
      (data.data && aletType.success),
    severity:
      (isEmpty && aletType.info) ||
      (data.error && aletType.error) ||
      (data.data && aletType.success),
    message: message(data, isEmpty),
    variant: variantType.filled,
  };

  function handlerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    if (validationEmptyFild(formDataObject as T)) {
      setIsEmpty(true);
      return;
    }

    setFetch({
      url: url,
      method: method,
      body: formDataObject,
    });
  }

  const StyleFacade = {
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: loading ? '1' : '0',
    zIndex: '9999',
    width: loading ? '100%' : '0',
    height: loading ? '100%' : '0',
    borderRadius: '3px',
    borderTop: '2px solid #ffffff4f',
    borderLeft: '2px solid #ffffff68',
    borderRight: '2px solid #ffffff84',
    borderBottom: '2px solid #ffffff9c',
    boxShadow: '2px 2px 3px 1px black',
    backgroundColor: '#ffffff22',
    backdropFilter: 'blur(.9px)',
    transition: 'width 1.5 ease, height 1.5s ease, opacity 2s ease',
  }

  return (
    <>
      {loading && <Loading />}
      <TimeAlert
        key='TimeAlert'
        show={show}
        alertData={alertData}
        exe={() => {
          setIsEmpty(false);
        }}
      />
      <form onSubmit={handlerSubmit} style={{
        display: 'flex',
        padding: '5px',
        paddingTop: loading ? '40px' : '',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={StyleFacade}></div>
        {children}
        <button
          type='submit'
          className='btn'>
          send
        </button>
      </form>
    </>
  )
}