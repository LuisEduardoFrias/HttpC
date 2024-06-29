import { useState, useRef } from 'react';
import useInitialize from 'subscribe_state';
import Delay from './components/delay';
import MenuBtn from './components/menu_btn';
import Header from './components/header';
import Menu from './components/menu';
import Copyright from './components/copyright';
import './App.css';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

class State {
  name: string;
  constructor() {
    this.name = 'jose';
  }
}

export default function App() {
  useInitialize<State>((state, action) => {}, { name: '' });
  const [showAS, setShowAS] = useState(false);
  const [showM, setShowM] = useState(false);
  const [rotate, setRotate] = useState(0);
  const ulRef = useRef();

  function handlerClick(deg) {
    setShowM(!showM);
    setShowAS(!showAS);
    setRotate(deg);
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Box sx={{ my: 4 }}>
          <Header>
            <nav>
              <MenuBtn
                onClick={(value) => setShowM(value ?? !showM)}
                ulRef={ulRef}
              />
              <Menu
                ulRef={ulRef}
                showM={showM}
                showAS={showAS}
                handlerClick={handlerClick}
              />
            </nav>
          </Header>
          <main
            className='card'
            style={{ transform: `rotateY(${rotate}deg)` }}>
            <Delay showAS={showAS} />
          </main>
          <footer className='read-the-docs'>
            <Copyright />
          </footer>
        </Box>
      </Container>
    </>
  );
}
