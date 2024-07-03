//
import Form, { Method, DataResult } from './form'
import '../styles/punch_screen.css';

type formObject = {
  fingerprint: string;
}

export default function PunchScreen() {

  function validationEmptyFild(obj: formObject): boolean {
    return obj.fingerprint === "" ? true : false;
  }

  function messageResult(obj: DataResult, isCode: boolean): string {
    return (isCode && 'Code is required.') ||
      (obj.error && 'Access denied.') ||
      (obj.data && `${obj.data.userName} Approved access.`);
  }

  return (
    <div className='punch-container'>
      <h1>Punch screen</h1>
      <div>
        <Form<formObject>
          url='arrival_registration'
          method={Method.POST}
          validationEmptyFild={validationEmptyFild}
          message={messageResult}
        >
          <label>Code</label>
          <input
            type='text'
            placeholder='Example: 7251, 6257, 1682 ...'
            name='fingerprint'
          />
        </Form>
      </div>
    </div>
  );
}
