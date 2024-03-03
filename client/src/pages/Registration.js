import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts';
import './Auth.css'
import { login, registration } from '../http/userAPI';
import { Context } from '..';

const Registration = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === REGISTRATION_ROUTE
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [telephoneNumber, setTelephoneNumber] = useState('')
    const [fanId, setFanId] = useState('')


    const click = async () => {
        try
        {
            let data;
            data = await registration(firstName, email, password, telephoneNumber, fanId);
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        }
        catch (e)
        {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 800 }} className="p-5 border border-white" bg='transparent'>
                <h2 className='m-auto text-white'>{'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3 input-class'
                        input type = "text"
                        placeholder='Имя'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white', textAlign:'left'}}
                    />
                    <Form.Control
                        className='mt-3 input-class'
                        input type = "text"
                        placeholder='Электронная почта'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white' }}
                    />
                    <Form.Control
                        className='mt-3 input-class'
                        style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white'}}
                        input type = "password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder ='Пароль'
                    />
                    <Form.Control
                        className='mt-3 input-class'
                        style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white'}}
                        input type = "number"
                        value={telephoneNumber}
                        onChange={e => setTelephoneNumber(e.target.value)}
                        placeholder ='Номер телефона'
                    />
                    <Form.Control
                        className='mt-3 input-class'
                        style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white'}}
                        input type = "number"
                        value={fanId}
                        onChange={e => setFanId(e.target.value)}
                        placeholder ='FanId'
                    />
                    <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        <Button
                            variant='outline-light'
                            className='mt-2 mx-auto'
                            onClick={click}
                            style={{ width: 400, border: '1px solid white'}}
                        >
                            Зарегистрироваться
                        </Button>
                        <div className='text-white m-center mt-5'>
                           <NavLink to={LOGIN_ROUTE} style={{ color: 'white', marginLeft:'330px', fontSize:'16px' }}>Войти</NavLink>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Registration;
