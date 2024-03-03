import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { deleteNews } from '../../http/newsAPI';

const DeleteNews = ({ show, onHide }) => {
    const [newsId, setNewsId] = useState(''); // Состояние для хранения ID новости для удаления

    const handleDelete = async () => {
        try {
            // Вызываем функцию deleteNews для удаления новости по её ID
            await deleteNews(newsId);
            onHide(); // Закрываем модальное окно после удаления
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
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
                    Удалить новость
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        className='mt-3' 
                        placeholder={'Введите Id новости для удаления'} 
                        value={newsId}
                        onChange={(e) => setNewsId(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-dark'} onClick={onHide}>Отмена</Button>
                <Button variant={'outline-danger'} onClick={handleDelete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteNews;
