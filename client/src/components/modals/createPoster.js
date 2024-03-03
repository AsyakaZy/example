// createPoster.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import { fetchClubs, fetchStadiums, fetchPlayers, createPoster } from '../../http/posterAPI';
import './CreatePoster.css'; // Импортируем файл стилей

const CreatePoster = ({ show, onHide }) => {
    const [homeClubs, setHomeClubs] = useState([]);
    const [guestClubs, setGuestClubs] = useState([]);
    const [homePlayers, setHomePlayers] = useState([]);
    const [guestPlayers, setGuestPlayers] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [selectedHomePlayer, setSelectedHomePlayer] = useState(null);
    const [selectedGuestPlayer, setSelectedGuestPlayer] = useState(null);
    const [quote, setQuote] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const homeClubsData = await fetchClubs();
                const guestClubsData = await fetchClubs();
                const homePlayersData = await fetchPlayers();
                const guestPlayersData = await fetchPlayers();
                const stadiumsData = await fetchStadiums();

                setHomeClubs(homeClubsData);
                setGuestClubs(guestClubsData);
                setHomePlayers(homePlayersData);
                setGuestPlayers(guestPlayersData);
                setStadiums(stadiumsData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, [show]);

    const handleSubmit = async () => {
        try {
            // Формируем объект данных для отправки на сервер
            const data = {
                homePlayer: selectedHomePlayer,
                guestPlayer: selectedGuestPlayer,
                quote,
                date,
                time
            };
            // Отправляем данные на сервер
            await createPoster(data);
            // Закрываем модальное окно после успешного добавления
            onHide();
        } catch (error) {
            console.error('Ошибка при добавлении афиши:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить афишу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите домашний клуб</Form.Label>
                        <Form.Select onChange={(e) => console.log(e.target.value)}>
                            <option value="">Выберите домашний клуб</option>
                            {homeClubs.map(club => (
                                <option key={club.id} value={club.name}>{club.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите гостевой клуб</Form.Label>
                        <Form.Select onChange={(e) => console.log(e.target.value)}>
                            <option value="">Выберите гостевой клуб</option>
                            {guestClubs.map(club => (
                                <option key={club.id} value={club.name}>{club.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите игрока домашнего клуба</Form.Label>
                        <Form.Select onChange={(e) => setSelectedHomePlayer(homePlayers.find(player => player.name === e.target.value))}>
                            <option value="">Выберите игрока домашнего клуба</option>
                            {homePlayers.map(player => (
                                <option key={player.id} value={player.name}>{player.name}</option>
                            ))}
                        </Form.Select>
                        {selectedHomePlayer && (
                            <div className="mt-3">
                                <Image src={selectedHomePlayer.photo} alt={selectedHomePlayer.name} fluid />
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите игрока гостевого клуба</Form.Label>
                        <Form.Select onChange={(e) => setSelectedGuestPlayer(guestPlayers.find(player => player.name === e.target.value))}>
                            <option value="">Выберите игрока гостевого клуба</option>
                            {guestPlayers.map(player => (
                                <option key={player.id} value={player.name}>{player.name}</option>
                            ))}
                        </Form.Select>
                        {selectedGuestPlayer && (
                            <div className="mt-3">
                                <Image src={selectedGuestPlayer.photo} alt={selectedGuestPlayer.name} fluid />
                            </div>
                        )}
                    </Form.Group>

                    <Form.Control className='mt-3' placeholder='Введите цитату' onChange={(e) => setQuote(e.target.value)} />
                    
                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите стадион</Form.Label>
                        <Form.Select onChange={(e) => console.log(e.target.value)}>
                            <option value="">Выберите стадион</option>
                            {stadiums.map(stadium => (
                                <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Control className='mt-3' type='date' placeholder='Введите дату' onChange={(e) => setDate(e.target.value)} />
                    <Form.Control className='mt-3' type='time' placeholder='Введите время' onChange={(e) => setTime(e.target.value)} />

                    <hr />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-dark'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-dark'} onClick={handleSubmit}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePoster;
