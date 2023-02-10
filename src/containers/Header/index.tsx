import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import igniteLogo from '../../assets/ignite-logo.svg';

import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
