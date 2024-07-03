//
import { useState, useEffect } from 'react';
import AdminLogin from './admin_login';
import ArrivelRegistration from './arrivel_registration';
import EmployeList from './employe_list';
import AddEmploye from './add_employe.tsx';
import { State } from '../models/state'
import useFetch, { Method } from '../hooks/use_fetch';
import { useSubscribeState } from 'subscribe_state';

export default function AdminScreen() {
  const [setFetch, data, loading] = useFetch(import.meta.env.VITE_API_BASE_URL);
  const [{ menuAdminOp, token }, dispatch] = useSubscribeState(["menuAdminOp", "token"]);
  const [optionMenu, setOptionMenu] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setOptionMenu(menuAdminOp);
    }, 1000);
  }, [menuAdminOp]);

  return (
    <div className='punch-container'>
      <h1>Admin screen</h1>
      <hr />
      <div>
        {optionMenu === 1 ? (
          <AdminLogin />
        ) : optionMenu === 2 ? (
          <ArrivelRegistration token={token} />
        ) : optionMenu === 3 ? (
          <EmployeList token={token} />
        ) : (
          <AddEmploye token={token} />
        )}
      </div>
    </div>
  );
}
