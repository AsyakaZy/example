import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { updateMatch, fetchMatchById, fetchClubs, fetchStadiums, fetchCities } from '../../http/matchAPI';

const UpdateMatch = ({ show, onHide }) => {
    const [searchById, setSearchById] = useState(true);
    const [matchData, setMatchData] = useState({
        clubHomeId: '',
        clubGuestId: '',
        date: '',
        time: '',
        stadiumId: '',
        cityId: ''
    });
    const [matchId, setMatchId] = useState('');

    const [clubs, setClubs] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setSearchById(true);
        const fetchData = async () => {
            try {
                const clubsData = await fetchClubs();
                const stadiumsData = await fetchStadiums();
                const citiesData = await fetchCities();

                setClubs(clubsData);
                setStadiums(stadiumsData);
                setCities(citiesData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, [show]);

    const handleSearchById = async () => {
        try {
            const match = await fetchMatchById(matchId);
            setMatchData({
                id: match.id, // добавляем идентификатор матча
                clubHomeId: match.clubHomeId,
                clubGuestId: match.clubGuestId,
                date: match.date,
                time: match.time,
                stadiumId: match.stadiumId,
                cityId: match.cityId
            });
            setSearchById(false);
        } catch (error) {
            console.error('Ошибка при поиске матча по Id:', error);
        }
    };
    

    const handleUpdate = async () => {
        try {
            // Предполагаем, что id матча уже установлен в объекте matchData
            await updateMatch(matchData);
            onHide();
        } catch (error) {
            console.error('Ошибка при обновлении матча:', error);
        }
    };
    

    const handleModalHide = () => {
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={handleModalHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {searchById ? 'Поиск матча по Id' : 'Обновить матч'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {searchById ? (
                    <Form>
                        <Form.Control className='mt-3' placeholder={'Введите Id матча'} value={matchId} onChange={(e) => setMatchId(e.target.value)} />
                    </Form>
                ) : (
                    <Form>
                        <Form.Group className='mt-3'>
                            <Form.Label>Выберите домашний клуб</Form.Label>
                            <Form.Control as="select" value={matchData.clubHomeId} onChange={(e) => setMatchData(prevState => ({ ...prevState, clubHomeId: e.target.value }))}>
                                <option value="">Выберите домашний клуб</option>
                                {clubs.map(club => (
                                    <option key={club.id} value={club.id}>{club.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Выберите гостевой клуб</Form.Label>
                            <Form.Control as="select" value={matchData.clubGuestId} onChange={(e) => setMatchData(prevState => ({ ...prevState, clubGuestId: e.target.value }))}>
                                <option value="">Выберите гостевой клуб</option>
                                {clubs.map(club => (
                                    <option key={club.id} value={club.id}>{club.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Control className='mt-3' type='date' placeholder='Введите дату' value={matchData.date} onChange={(e) => setMatchData(prevState => ({ ...prevState, date: e.target.value }))} />
                        <Form.Control className='mt-3' type='time' placeholder='Введите время' value={matchData.time} onChange={(e) => setMatchData(prevState => ({ ...prevState, time: e.target.value }))} />

                        <Form.Group className='mt-3'>
                            <Form.Label>Выберите стадион</Form.Label>
                            <Form.Control as="select" value={matchData.stadiumId} onChange={(e) => setMatchData(prevState => ({ ...prevState, stadiumId: e.target.value }))}>
                                <option value="">Выберите стадион</option>
                                {stadiums.map(stadium => (
                                    <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Выберите город</Form.Label>
                            <Form.Control as="select" value={matchData.cityId} onChange={(e) => setMatchData(prevState => ({ ...prevState, cityId: e.target.value }))}>
                                <option value="">Выберите город</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-dark'} onClick={handleModalHide}>
                    {searchById ? 'Отмена' : 'Закрыть'}
                </Button>
                {searchById ? (
                    <Button variant={'outline-dark'} onClick={handleSearchById}>Найти</Button>
                ) : (
                    <Button variant={'outline-dark'} onClick={handleUpdate}>Обновить</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateMatch;
