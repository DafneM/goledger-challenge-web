import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import styles from './style';
import TechLifeBlockchain from '../../Assets/TechLifeBlockchain.png';

const NavbarComp = () => {
  return (
    <Navbar expand="lg" variant="light" clickfixed="top" fixed="top" style={styles.navbar}>
      <Navbar.Brand>
        <img style={styles.navbarImage} src={TechLifeBlockchain}/>
      </Navbar.Brand>
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <Nav.Link style={styles.navbarText}>
                Lista de ativos
              </Nav.Link>
              <span style={styles.linhaVertical}/>
              <Nav.Link style={styles.navbarText}>
                Lista de transações
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;