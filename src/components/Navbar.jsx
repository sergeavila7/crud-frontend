import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { ImUserPlus } from 'react-icons/im';
import '../assets/styles/App.scss';

const NavbarJsx = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setMenu(true);
    }
  }, []);

  const exit = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <Navbar className='p-0' bg='dark' variant='dark'>
      {menu ? (
        <div className='container'>
          <Nav.Link className='h4 d-flex'>
            <h4 className='pr-2'>Bienvenido</h4>
            <h4>{sessionStorage.getItem('name')}</h4>
          </Nav.Link>
          <Nav className='ml-auto'>
            <NavLink to='/home'>
              <i>
                <FaHome />
              </i>
              Inicio
            </NavLink>
            <Nav.Link onClick={() => exit()}>
              <i>
                <GoSignOut />
              </i>
              Salir
            </Nav.Link>
          </Nav>
        </div>
      ) : (
        <div className='container'>
          <Nav className='ml-auto'>
            <NavLink to='/'>
              <i>
                <FaHome />
              </i>
              Inicio
            </NavLink>
            <NavLink to='/register'>
              <i>
                <ImUserPlus />
              </i>
              Registrar
            </NavLink>
          </Nav>
        </div>
      )}
    </Navbar>
  );
};

export default NavbarJsx;
