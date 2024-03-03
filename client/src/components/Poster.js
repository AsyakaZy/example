import React, { useContext } from 'react';
import './Poster.css'; // Подключаем файл стилей
import { Button, Container } from 'react-bootstrap';
import { Context } from '../index';

const Poster = () => {
    const { poster } = useContext(Context);

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('ru-RU', options);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    return (
        <Container>
            {poster.posters.map(item => (
                <div key={item.id} className="poster-container">
                    <div className="club-names">
                        {item.clubHome && item.clubGuest && (
                            <h2>{item.clubHome.club && item.clubHome.club.name} - {item.clubGuest.club && item.clubGuest.club.name}</h2>
                        )}
                    </div>
                    <div className="quote" style={{ fontSize: 24, marginTop: '20px' }}>
                        {item.quote}
                    </div>
                    <div>
                        <img src={process.env.REACT_APP_API_URL + item.playerClubHome.player.photoPlayer} style={{ marginRight: '425px', marginTop: '-75px', height: '200px' }} />
                        <img src={process.env.REACT_APP_API_URL + item.playerClubGuest.player.photoPlayer} style={{ marginLeft: '450px', marginTop: '-230px', height: '200px' }} />
                        <div style={{ marginRight: '500px', fontSize: '18px', marginTop: '-10px' }}>
                            {item.playerClubHome.player.namePlayer}
                        </div>
                        <div style={{ marginRight: '-480px', fontSize: '18px', marginTop: '-25px' }}>
                            {item.playerClubGuest.player.namePlayer}
                        </div>
                        <div style={{ marginRight: '-480px', fontSize: '18px', marginTop: '32px' }}>
                            {formatDate(item.date)} {formatTime(item.time)}
                        </div>
                    </div>
                    <div className="buy-ticket-button" style={{ marginTop: '-95px' }}>
                        <Button variant='outline-light'>Купить билет</Button>
                    </div>
                    <div className="stadium-name">
                        {item.stadium && (
                            <h3>{item.stadium.name}</h3>
                        )}
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default Poster;
