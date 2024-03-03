// DeleteMatch.js
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { deleteMatchById } from '../../http/matchAPI';

const DeleteMatch = ({ show, onHide }) => {
    const [matchId, setMatchId] = useState('');

    const handleDelete = async () => {
        try {
            await deleteMatchById(matchId);
            onHide(); // Закрываем модальное окно после удаления
        } catch (error) {
            console.error('Ошибка при удалении матча:', error);
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
                    Удалить матч
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-3'
                        placeholder={'Введите Id матча для удаления'}
                        value={matchId}
                        onChange={(e) => setMatchId(e.target.value)}
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

export default DeleteMatch;
