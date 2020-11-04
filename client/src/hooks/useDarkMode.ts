import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../reducers';
import { toggleDarkMode } from '../actions';

export const useDarkMode = () => {
  const { darkMode } = useSelector((state: StoreState) => {
    return {
      darkMode: state.darkMode,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    document
      .getElementsByTagName('HTML')[0]
      .setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  return { toggle };
};
