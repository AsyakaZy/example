import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate} from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Appcss from "../App.css";
import logo from '../assets/logo.png'
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite"

const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return(
        <Navbar style={{ backgroundColor: 'transparent', justifyContent:'center', marginLeft:'220px' }} variant="dark" data-bs-theme="dark">
            <Container>
            {
                user.isAuth ?
                <Button variant='outline-light'
                onClick={() => navigate(ADMIN_ROUTE)}
                >Админ панель</Button>
                :
                <Button variant='outline-light'>Выбрать билеты</Button>
            }
            <span style={{ color: 'white'}}>День добрый</span>
            <NavLink to={SHOP_ROUTE} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none'}}>
                    <img src={logo} alt="YARTSO Logo" style={{ width: '100px' }} />
                    <span>YARTSO</span>
                </NavLink>
                <span style={{ color: 'white'}}>Успех начинается с первого шага</span>
            {user.isAuth ?
                <Button variant='outline-light' onClick={() => logOut()}>Выйти</Button>
                :
                <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
            }
                <Nav>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
