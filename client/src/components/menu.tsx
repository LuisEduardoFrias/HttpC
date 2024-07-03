//
export type Option = {
  execute,
  text
}

type TMenuProps = {
  ulRef: any;
  show: boolean;
  options: Option;
};

export default function Menu({ ulRef, show, options }: TMenuProps) {

  const StyleM = {
    opacity: show ? 1 : 0,
    minHeight: show ? '50px' : '0px',
    top: show ? '50px' : '-10000px',
    left: !show && '-10000px',
  };

  return (
    <ul
      ref={ulRef}
      style={StyleM}>
      {
        options.map((op, index)=>
          <li key={index}>
            <button onClick={() => op.execute()}>{op.text}</button>
          </li>
        )
      }
    </ul>
  );
}
