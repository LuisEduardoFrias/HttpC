
import { useState, useEffect } from 'react';

export type Setter = {
  key: string,
  value: object
}

export default function useLocalStorage() {
  const [sett, setter] = useState<Setter>()
  const [gett, getter] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && sett) {
      try {
        window.localStorage.setItem(sett.key, JSON.stringify(sett.value));
      } catch (err) {
        //console.error(err)
      }
    }
  }, [sett]);

  useEffect(() => {
    if (gett) {
      try {
        const storedValue = typeof window !== 'undefined' ? window.localStorage.getItem(gett) : null;
        setValue(storedValue ? JSON.parse(gett) : null);
      } catch (err) {
        //console.error(err)
      }
    }
  }, [gett]);

  return [value, getter, setter];
};
