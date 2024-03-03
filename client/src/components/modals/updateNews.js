import React, { useState, useEffect, useContext } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { changeNews } from '../../http/newsAPI';
import { Context } from '../..';

const UpdateNews = ({ show, onHide }) => {
    const [searchById, setSearchById] = useState(true);
    const [newsId, setNewsId] = useState(''); // Состояние для хранения Id новости
    const [heading, setHeading] = useState(''); // Состояние для хранения заголовка новости
    const [text, setText] = useState(''); // Состояние для хранения текста новости
    const [date, setDate] = useState(''); // Состояние для хранения даты новости
    const [photo, setPhoto] = useState(null); // Состояние для хранения фото новости

    useEffect(() => {
        setSearchById(true);
    }, [show]);

    const handleSearchById = () => {
        setSearchById(false);
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('heading', heading);
            formData.append('text', text);
            formData.append('photo', photo);
            formData.append('date', date);

            await changeNews(newsId, formData); // Изменяем данные новости
            onHide(); // Закрываем модальное окно после успешного обновления
        } catch (error) {
            console.error('Ошибка при обновлении новости:', error);
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
                    {searchById ? 'Поиск новости по Id' : 'Обновить новость'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {searchById ? (
                    <Form>
                        <Form.Control 
                            className='mt-3' 
                            placeholder={'Введите Id новости'} 
                            value={newsId} 
                            onChange={(e) => setNewsId(e.target.value)}
                        />
                    </Form>
                ) : (
                    <Form>
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите заголовок'
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите текст'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            type="file"
                            onChange={(e) => process.env.REACT_APP_API_URL + setPhoto(e.target.files[0])}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите дату'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <hr />
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

export default UpdateNews;
