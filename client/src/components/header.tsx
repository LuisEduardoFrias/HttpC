//
import {ReactElement} from 'react'

type THeadeProps ={
  children: ReactElement,
}
export default function Header({children}:THeadeProps) {
  return (
    <header>
      <h1>Punch Click Pro</h1>
      {children}
    </header>
  );
}
