import React, { ReactNode } from 'react';

import { Button } from '../Button';
import { Logo } from './Logo';
import './header.css';

export interface HeaderProps {
  branding: ReactNode[];
  menu?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ branding, menu }) => (
  <header>
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center">{branding}</div>
      {menu && <div className="flex-grow-1 flex items-center">{menu}</div>}
    </div>
  </header>
);
