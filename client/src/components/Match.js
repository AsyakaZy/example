import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NEWS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Match = observer(() => {
    const { match } = useContext(Context);
    const navigate = useNavigate();

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long'};
        return new Date(date).toLocaleDateString('ru-RU', options);
    };

    const formatTime = (time) => {
        // Разделить время на часы и минуты
        const [hours, minutes] = time.split(':');
        // Создать объект Date с фиктивной датой (например, 2000-01-01) и передать часы и минуты
        const date = new Date(2000, 0, 1, hours, minutes);
        // Форматировать время в нужном формате
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleTimeString('ru-RU', timeOptions);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px', marginLeft: '250px', width:'800px' }}>
                {match.matches.map(item => (
                    <Card key={item.id} style={{ maxWidth: '1000px', background: 'transparent', marginBottom: '20px', borderRadius:'40px', border:'1px solid white' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <div>
                            {item.stadium && item.stadium.name && (
                                <React.Fragment>
                                    <Card.Title style={{ color: 'white', width:'250px', marginTop:'15px', marginRight:'400px', fontSize:'16px', fontWeight:'bold' }}>{item.stadium.name}</Card.Title>
                                </React.Fragment>
                            )}
                            {item.clubHome && item.clubGuest && item.clubHome.club && item.clubGuest.club && (
                                <React.Fragment>
                                    <Card.Title style={{ color: 'white', marginLeft: '150px', width:'250px', marginTop:'-26px', fontSize:'16px', fontWeight:'bold' }}>{item.clubHome.club.name} - {item.clubGuest.club.name}</Card.Title>
                                </React.Fragment>
                            )}
                            {item.city && item.city.name && (
                                <React.Fragment>
                                    <Card.Title style={{ color: 'white', width:'250px', marginTop:'-27px', marginLeft:'350px', fontSize:'16px', fontWeight:'bold'}}>{item.city.name}</Card.Title>
                                </React.Fragment>
                            )}
                            <p style={{ color: 'white', fontWeight:'bold', marginLeft: '520px', marginTop:'-40px', fontSize:'16px' }}>{formatDate(item.date)}</p>
                            <Card.Title style={{ color: 'white', marginLeft: '542px', fontWeight:'bold', marginTop:'-15px', fontSize:'16px' }}>{formatTime(item.time)}</Card.Title>
                        </div>
                        <Button style = {{borderRadius:'20px'}}variant="outline-light" onClick={() => navigate(NEWS_ROUTE)}>Купить билет</Button>
                    </div>
                </Card>                
                ))}
            </div>
        </div>
    );
});

export default Match;
