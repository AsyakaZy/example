import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { createNews } from '../../http/newsAPI';

const CreateNews = ({ show, onHide }) => {
    const { news } = useContext(Context);
    const [heading, setHeading] = useState('');
    const [text, setText] = useState(''); // Добавляем состояние для текста новости
    const [photo, setPhoto] = useState(null);
    const [date, setDate] = useState('');

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('text', text); // Добавляем текст в formData
        formData.append('photo', photo);
        formData.append('date', date);

        try {
            const createdNews = await createNews(formData);
            // Обновляем список новостей
            news.setNews([...news.news, createdNews]);
            onHide(); // Закрываем модальное окно
        } catch (error) {
            console.error('Error creating news:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Добавить новость</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите заголовок'
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                    {/* Добавляем текстовое поле для ввода текста новости */}
                    <Form.Control
                        className='mt-3'
                        as="textarea"
                        rows={3}
                        placeholder='Введите текст новости'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите дату'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <hr />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-dark' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-dark' onClick={handleSubmit}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateNews;
