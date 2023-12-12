import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import Navbar from '../Navbar/Navbar';
import styles from './Header.module.css';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { login, logout, isAuth } = useUser();

  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <header
      className={`${styles.header} ${!isHomePage && styles.headerBackground} `}
    >
      <section className={styles.headerContent}>
        <div>
          <h3>LOGO</h3>

          <div>
            {isAuth ? (
              <button onClick={logout}>logout</button>
            ) : (
              <button onClick={login}>login</button>
            )}
            <div>{JSON.stringify(isAuth)}</div>
          </div>
        </div>
        <Navbar
          handleCloseMenu={handleCloseMenu}
          openMenu={openMenu}
          isHomePage={isHomePage}
        />
        <div onClick={handleOpenMenu} className={styles.openMenu}>
          <IoMenu
            size={32}
            className={`${
              isHomePage ? styles.openMenuIcon : styles.openMenuIconDark
            }`}
          />
        </div>
      </section>
    </header>
  );
};

export default Header;