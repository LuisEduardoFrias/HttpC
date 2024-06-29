//
import '../styles/arrivel_registration.css';
import TableX from './table';

export default function ArrivelRegistration() {
  interface registration {
    id: string;
    username: string;
    date: DataTime;
    io: string;
  }

  const data: readonly registration[] = [
    {
      id: '1527',
      username: 'Jose tejeda',
      date: '7:35 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5271',
      username: 'Robert castr9',
      date: '7:14 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '7157',
      username: 'Alex Ortiz',
      date: '7:30 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5168',
      username: 'Santo salmiento',
      date: '7:26 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '1527',
      username: 'Jose tejeda',
      date: '7:35 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5271',
      username: 'Robert castr9',
      date: '7:14 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '7157',
      username: 'Alex Ortiz',
      date: '7:30 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5168',
      username: 'Santo salmiento',
      date: '7:26 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '1527',
      username: 'Jose tejeda',
      date: '7:35 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5271',
      username: 'Robert castr9',
      date: '7:14 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '7157',
      username: 'Alex Ortiz',
      date: '7:30 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5168',
      username: 'Santo salmiento',
      date: '7:26 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '1527',
      username: 'Jose tejeda',
      date: '7:35 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5271',
      username: 'Robert castr9',
      date: '7:14 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '7157',
      username: 'Alex Ortiz',
      date: '7:30 A.M. 27/6/2024',
      io: 'input',
    },
    {
      id: '5168',
      username: 'Santo salmiento',
      date: '7:26 A.M. 27/6/2024',
      io: 'input',
    },
  ];

  return (
    <div className='arrivel-reg-container'>
      <h2>Arrivel registration</h2>
      <TableX data={data} />
    </div>
  );
}
