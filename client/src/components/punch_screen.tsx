//
import '../styles/punch_screen.css';

export default function PunchScreen() {
  const text = 'Acceso autorizado';
  const color = 'green';

  function handlerSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className='punch-container'>
      <h1>Punch screen</h1>
      <div>
        {false && (
          <div>
            <p style={{ color: color }}>{text}</p>
          </div>
        )}
        <form submit={handlerSubmit}>
          <h1></h1>
          <label>
            Code
            <input
              placeholder='Example: 7251, 6257, 1682 ...'
              name='code'
            />
          </label>
          <button>
            send
            {/*
              <img
              src='https://cdn-icons-png.flaticon.com/512/16189/16189730.png'
              alt='icon of access'
            />
            */}
          </button>
        </form>
      </div>
    </div>
  );
}
