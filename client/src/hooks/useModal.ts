import { useState } from 'react';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggleModal() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggleModal,
  };
};
