import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import logo2 from "../assets/logo2.png"
import vk from "../assets/vk3.png"
import tg from "../assets/tg.png"

const Footer = () => {  
    return (
        <div className="footer-container">
            <Navbar className="bg-body-transparent mt-5">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink style={{ marginLeft:'320px', color:'white', textDecoration: 'none', marginTop:'300px'}}>Стадионы</NavLink>
                            <NavLink style={{ marginLeft:'210px', color:'white', textDecoration: 'none', marginTop:'300px'}}>Новости</NavLink>
                            <NavLink style={{ marginLeft:'210px', color:'white', textDecoration: 'none', marginTop:'300px'}}>Контакты</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="footer-line"></div>
            <Navbar className="bg-body-transparent mt-3">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <img src = {logo2} style={{width:'42px', height:'30px', marginLeft:'280px'}}/>
                            <div style={{ color:'white', marginLeft:'30px', marginTop:'-5px', fontSize:'12px' }}>
                                Все права защищены © 2024-2024<br/>
                                «Yartso Industries»
                            </div>
                            <div style={{ color:'white', marginLeft:'50px', marginTop:'-5px', fontSize:'12px' }}>
                                Правила посещения платформы Yartso<br/>
                                Политика обработки персональных данных Yartso
                            </div>
                            <img src = {vk} style={{width:'30px', height:'29px', color:"white", marginTop:'-5px', marginLeft:'10px'}}/>
                            <img src = {tg} style={{width:'30px', height:'29px', color:"white", marginLeft:'5px', marginTop:'-5px'}}/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Footer;
