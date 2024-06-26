import { useState } from 'react';
import AdminScreen from './components/admin_screen.tsx';
import PunchScreen from './components/punch_screen.tsx';
import './App.css';

function App() {
  //AS = Admin Screen
  const [showAS, setShowAS] = useState(false);

  return (
    <>
      <header>
        <h1>Punch Click Pro</h1>

        <nav>
          <ul>{!showAS ? <li>Admin</li> : <li>Exit admin</li>}</ul>
          <button>☰</button>
        </nav>
      </header>
      <main className='card'>
        {!showAS ? (
          <PunchScreen key='PunchScreen' />
        ) : (
          <AdminScreen key='AdminScreen' />
        )}
      </main>
      <foother className='read-the-docs'>
        <p>©Copy ®Right</p>
      </foother>
    </>
  );
}

export default App;
