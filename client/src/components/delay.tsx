//
import { useState, useEffect } from 'react';
import AdminScreen from './admin_screen';
import PunchScreen from './punch_screen';

export default function Delay({ showAS }: { showAS: boolean }) {
  const [showAdminScreen, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setState(showAS);
    }, 1000);
  }, [showAS]);

  return (
    <>
      {!showAdminScreen ? (
        <PunchScreen key='PunchScreen' />
      ) : (
        <AdminScreen key='AdminScreen' />
      )}
    </>
  );
}
