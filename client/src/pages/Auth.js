import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts';
import './Auth.css'
import { login, registration} from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try
        {
            let data;
            data = await login(email, password);
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        }
        catch(e)
        {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5 border border-white" bg='transparent'>
                <h2 className='m-auto text-white'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
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
                    <Row className='d-flex justify-content-between mt-3 pl-3 pr-3 reg-route'>
                            <Button
                            variant='outline-light'
                            className='mt-2 mx-auto'
                            onClick={click}
                            navigate = {SHOP_ROUTE}
                            style={{ width: 500, border: '1px solid white'}}
                        >
                            Войти
                        </Button>
                        <div className='text-white mt-5'>
                           <NavLink to={REGISTRATION_ROUTE} style={{ color: 'white', marginLeft:'182px' }}>Зарегистрируйтесь</NavLink>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;



