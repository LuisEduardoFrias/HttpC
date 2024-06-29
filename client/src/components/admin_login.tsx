//
export default function AdminLogin() {
  const text = 'Acceso autorizado';
  const color = 'green';

  function handlerSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className='punch-container'>
      <h1>Admin login</h1>
      <div>
        {false && (
          <div>
            <p style={{ color: color }}>{text}</p>
          </div>
        )}
        <form submit={handlerSubmit}>
          <label>
            User
            <input
              placeholder='Example: Admmin.S'
              name='code'
            />
          </label>
          <label>
            Password
            <input
              placeholder='Example: ***Adm***'
              name='code'
            />
          </label>
          <button className='btn'>
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
