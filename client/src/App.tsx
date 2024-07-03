//
import useInitialize from 'subscribe_state';
import Reducer from './reducers/reducer';
import Core from './core';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { State } from './models/state.'
import './App.css';

const initialaState: State = {
  menuAdminOp: 1,
  showOp: false,
  token: null
}

export default function App() {
  useInitialize(Reducer, initialaState);

  return (
    <>
      <Container maxWidth='sm'>
        <Box sx={{ my: 4 }}>
          <Core />
        </Box>
      </Container>
    </>
  );
}
