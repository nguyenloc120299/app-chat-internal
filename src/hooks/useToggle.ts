import { useState, useCallback } from "react";

// TypeScript type for the useToggle hook
type ToggleHookType = [boolean, () => void];

const useToggle = (initialState: boolean = false): ToggleHookType => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  // Define and memorize toggler function in case we pass down the component,
  // This function changes the boolean value to its opposite value
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggle;
