//
import { useState } from 'react';
import AdminLogin from './admin_login';
import ArrivelRegistration from './arrivel_registration';
import EmployeList from './employe_list';
import AddEmploye from './add_employe.tsx';

export default function AdminScreen() {
  const [optionMenu, setOptionMenu] = useState(4);
  return (
    <div className='punch-container'>
      <h1>Admin screen</h1>
      <div>
        {optionMenu === 1 ? (
          <AdminLogin />
        ) : optionMenu === 2 ? (
          <ArrivelRegistration />
        ) : optionMenu === 3 ? (
          <EmployeList />
        ) : (
          <AddEmploye />
        )}
      </div>
    </div>
  );
}
