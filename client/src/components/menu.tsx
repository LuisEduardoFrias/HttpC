//

type TMenuProps = {
  ulRef: any;
  showM: boolean;
  showAS: boolean;
  handlerClick: (value: number) => void;
};

export default function Menu({
  ulRef,
  showM,
  showAS,
  handlerClick,
}: TMenuProps) {
  
  const StyleM = {
    opacity: showM ? 1 : 0,
    minHeight: showM ? '50px' : '0px',
    top: showM ? '50px' : '-10000px',
    left: !showM && '-10000px',

    //visibility: showM ? 'visible' : 'hidden',
  };

  return (
    <ul
      ref={ulRef}
      style={StyleM}>
      {!showAS ? (
        <li>
          <button onClick={() => handlerClick(355)}>Admin</button>
        </li>
      ) : (
        <>
          <li>
            <button onClick={() => handlerClick(0)}>
              Arrival registration
            </button>
          </li>
          <li>
            <button onClick={() => handlerClick(0)}>Employe list</button>
          </li>
          <li>
            <button onClick={() => handlerClick(0)}>Add employe</button>
          </li>
          <li>
            <button onClick={() => handlerClick(0)}>Delete employe</button>
          </li>
          <li>
            <button onClick={() => handlerClick(0)}>Exit admin</button>
          </li>
        </>
      )}
    </ul>
  );
}
