import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import './NavPanel.css'; // Подключаем файл стилей

const NavPanel = () => {    
    return (
        <div>
            <div className="top-line"></div> {/* Белая полоска над компонентами */}
            <Navbar expand="lg" className="navbar-custom mt-5" style={{marginLeft:'230px'}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Стадионы" id="stadiums-dropdown" style={{marginTop:'-50px', marginLeft:'50px'}} >
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Выберите дату" id="date-dropdown" style={{marginLeft:'470px', marginTop:'-50px'}}>
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="bottom-line"></div> {/* Белая полоска под компонентами */}
        </div>
    );
};

export default NavPanel;
