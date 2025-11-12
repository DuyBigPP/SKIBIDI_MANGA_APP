import { useState, useCallback } from 'react';

/**
 * Hook để toggle boolean state
 * @example
 * const [isOpen, toggleOpen] = useToggle(false);
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
}
