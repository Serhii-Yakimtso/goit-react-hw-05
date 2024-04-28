import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getNavlinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <>
      <nav className={css.menu}>
        <NavLink to="/" className={getNavlinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getNavlinkClass}>
          Movies
        </NavLink>
      </nav>
    </>
  );
}
