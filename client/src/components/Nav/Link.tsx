import React from 'react';

interface LinkProps {
  className: string;
  href: string;
  children: string;
}

const _Link = ({ className, href, children }: LinkProps): JSX.Element => {
  const onClick = (event: any) => {
    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export const Link = _Link;
