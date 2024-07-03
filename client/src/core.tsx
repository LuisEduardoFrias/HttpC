//
import { useState, useEffect, useRef } from 'react';
import useFetch, { Method } from './hooks/use_fetch';
import { useSubscribeState } from 'subscribe_state';
import Delay from './components/delay';
import MenuBtn from './components/menu_btn';
import Menu, { Option } from './components/menu';
import Header from './components/header';
import Copyright from './components/copyright';
import './App.css';

export default function Core() {
  const [{ showOp, menuAdminOp, token }, dispatch] = useSubscribeState(["showOp", "menuAdminOp", "token"]);
  const [setFetch, data, loading] = useFetch(import.meta.env.VITE_API_BASE_URL);
  const [showMenu, setShowMenu] = useState(false);
  const [showAS, setShowAS] = useState(false);
  const [rotate, setRotate] = useState(0);
  const ulRef = useRef();

  const options: Option = [
    {
      execute: () => {
        setShowMenu(!showMenu);
        setShowAS(true);
        setRotate(rotate == 0 ? 355 : 0);
      },
      text: "Admin"
    },
  ]
  const adminOptions: Option = [
    {
      execute: () => {
        setShowMenu(!showMenu);
        setShowAS(false);
        setRotate(rotate == 0 ? 355 : 0);
        dispatch({ type: 'changeMenu', option: 1 })
      },
      text: "Exit admin"
    },
  ]
  const accessOptions: Option = [
    {
      execute: () => {
        setShowMenu(!showMenu);
        setRotate(rotate == 0 ? 355 : 0);
        dispatch({ type: 'changeMenu', option: 2 })
      },
      text: "Arrival registration"
    },
    {
      execute: () => {
        setShowMenu(!showMenu);
        setRotate(rotate == 0 ? 355 : 0);
        dispatch({ type: 'changeMenu', option: 3 })
      },
      text: "Employe list"
    },
    {
      execute: () => {
        setShowMenu(!showMenu);
        setRotate(rotate == 0 ? 355 : 0);
        dispatch({ type: 'changeMenu', option: 4 })
      },
      text: "Add employe"
    },
  ]

  accessOptions.splice(menuAdminOp - 2, 1)

  useEffect(() => {
    if (token && !showAS) {
      setFetch({
        url: `register/logout/${token}`,
        method: Method.POST
      });
      dispatch({ type: "logout" })
    }
  }, [showAS])

  useEffect(() => {
    if (showOp)
      setRotate(rotate == 0 ? 355 : 0);
  }, [showOp])

  return (
    <>
      <Header>
        <nav>
          <MenuBtn
            onClick={(value) => setShowMenu(value ?? !showMenu)}
            ulRef={ulRef}
          />
          <Menu
            ulRef={ulRef}
            show={showMenu}
            options={!showAS ? options : (!showOp ? adminOptions :
              accessOptions.concat(adminOptions))}
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
    </>
  );
}
