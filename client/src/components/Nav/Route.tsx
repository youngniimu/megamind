import { useState, useEffect } from 'react';

interface AppProps {
  path: string;
  children: JSX.Element;
}

const _Route = (props: AppProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return currentPath === props.path ? props.children : null;
};

export const Route = _Route;
