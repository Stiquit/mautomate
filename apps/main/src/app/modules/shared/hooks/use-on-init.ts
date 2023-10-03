import { EffectCallback, useEffect, useRef } from 'react';

export function useOnInit(callback: EffectCallback) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      callback();
    }
  }, []);
}
