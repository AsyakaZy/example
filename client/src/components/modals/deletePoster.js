// DeletePoster.js
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { deletePoster } from '../../http/posterAPI';

const DeletePoster = ({ show, onHide }) => {
    const [id, setId] = useState('');

    const handleDelete = async () => {
        try {
            await deletePoster(id);
            onHide(); // Закрываем модальное окно после удаления
        } catch (error) {
            console.error('Ошибка при удалении афиши:', error);
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
                    Удалить афишу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className='mt-3' placeholder={'Введите Id афиши для удаления'} value={id} onChange={(e) => setId(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-dark'} onClick={onHide}>Отмена</Button>
                <Button variant={'outline-danger'} onClick={handleDelete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletePoster;
