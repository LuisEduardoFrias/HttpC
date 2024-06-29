//
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/add_employe.css';

export default function AddEmploye() {
  return (
    <div className='add-employe-container'>
      <h2>Add Employe</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField
          required
          error={false}
          id='fingetprint'
          label='Finger Print'
          variant='standard'
          type='number'
          helperText=''
        />
        <TextField
          required
          error={false}
          id='username'
          label='User Name'
          variant='standard'
          helperText=''
        />
        <TextField
          required
          error={false}
          id='userlastname'
          label='User LastName'
          variant='standard'
          helperText=''
        />
        <TextField
          required
          error={false}
          id='usercardid'
          label='User CardId'
          variant='standard'
          type='number'
          helperText=''
        />
        <Button>Sentd</Button>
      </form>
    </div>
  );
}
