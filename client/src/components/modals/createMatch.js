import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createMatch } from '../../http/matchAPI';
import { fetchClubs, fetchStadiums, fetchCities } from '../../http/matchAPI';

const CreateMatch = ({ show, onHide }) => {
    const [clubs, setClubs] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedClubHome, setSelectedClubHome] = useState('');
    const [selectedClubGuest, setSelectedClubGuest] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [tour, setTour] = useState('');
    const [selectedStadium, setSelectedStadium] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
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
    }, []);

    const handleAddMatch = async () => {
        try {
            const formData = {
                clubHomeId: selectedClubHome,
                clubGuestId: selectedClubGuest,
                date,
                time,
                tour,
                stadiumId: selectedStadium,
                cityId: selectedCity
            };

            const response = await createMatch(formData);
            console.log(response.data);
            // Сброс всех полей формы и закрытие модального окна
            setSelectedClubHome('');
            setSelectedClubGuest('');
            setDate('');
            setTime('');
            setTour('');
            setSelectedStadium('');
            setSelectedCity('');
            onHide();
        } catch (error) {
            console.error('Ошибка при добавлении матча:', error);
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
                    Добавить матч
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите домашний клуб</Form.Label>
                        <Form.Control as="select" value={selectedClubHome} onChange={(e) => setSelectedClubHome(e.target.value)}>
                            <option value="">Выберите домашний клуб</option>
                            {clubs && clubs.map(club => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите гостевой клуб</Form.Label>
                        <Form.Control as="select" value={selectedClubGuest} onChange={(e) => setSelectedClubGuest(e.target.value)}>
                            <option value="">Выберите гостевой клуб</option>
                            {clubs && clubs.map(club => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Control className='mt-3' type='date' placeholder='Введите дату' value={date} onChange={(e) => setDate(e.target.value)} />
                    <Form.Control className='mt-3' type='time' placeholder='Введите время' value={time} onChange={(e) => setTime(e.target.value)} />
                    <Form.Control className='mt-3' type='text' placeholder='Введите тур' value={tour} onChange={(e) => setTour(e.target.value)} />

                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите стадион</Form.Label>
                        <Form.Control as="select" value={selectedStadium} onChange={(e) => setSelectedStadium(e.target.value)}>
                            <option value="">Выберите стадион</option>
                            {stadiums && stadiums.map(stadium => (
                                <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label>Выберите город</Form.Label>
                        <Form.Control as="select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                            <option value="">Выберите город</option>
                            {cities && cities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <hr />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-dark'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-dark'} onClick={handleAddMatch}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMatch;
