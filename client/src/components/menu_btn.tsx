import { useRef, useEffect } from 'react';

type TMenuBtnProps = {
  onClick: (value: boolean | null) => void;
  ulRef: any;
};

export default function MenuBtn({ onClick, ulRef }: TMenuBtnProps) {
  const btnRef = useRef();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (
      ulRef.current &&
      btnRef.current &&
      !ulRef.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      onClick(false);
    }
  }

  return (
    <button
      ref={btnRef}
      className='btn'
      onClick={() => onClick(null)}>
      ☰
    </button>
  );
}
