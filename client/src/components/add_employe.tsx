//
import Form, { Method, DataResult } from './form'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import '../styles/add_employe.css';

export default function AddEmploye({ token }: { token: string }) {

  type formObject = {
    fingetprint: string;
    username: string;
    userlastname: string;
    usercardid: string;
  }

  function validationEmptyFild(obj: formObject): boolean {
    return false;
  }

  function messageResult(obj: DataResult, isCod: boolean): string {
    return (isCod && 'The filds whith \'*\' are required.') ||
      (obj.error && 'Access denied.') ||
      (obj.data && 'Approved access.');
  }

  return (
    <div className='add-employe-container'>
      <h2>Add Employe</h2>
      <Form<formObject>
        url={`employed/${token}`}
        method={Method.POST}
        validationEmptyFild={validationEmptyFild}
        message={messageResult}
      >
        <TextField
          required
          error={false}
          id='fingetprint'
          name='fingetprint'
          label='Finger Print'
          variant='standard'
          type='number'
          helperText=''
        />
        <TextField
          required
          error={false}
          id='username'
          name='username'
          label='User Name'
          variant='standard'
          helperText=''
        />
        <TextField
          required
          error={false}
          id='userlastname'
          name='userlastname'
          label='User LastName'
          variant='standard'
          helperText=''
        />
        <TextField
          required
          error={false}
          id='usercardid'
          name='usercardid'
          label='User CardId'
          variant='standard'
          type='number'
          helperText=''
        />
      </Form>
    </div >
  );
}
