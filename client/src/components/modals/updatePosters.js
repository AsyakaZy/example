import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';

const UpdatePoster = ({ show, onHide }) => {
    const [searchById, setSearchById] = useState(true);

    useEffect(() => {
        setSearchById(true); // Установить состояние поиска по Id при каждом изменении пропса show
    }, [show]);

    const handleSearchById = () => {
        setSearchById(false);
    };

    const handleUpdate = () => {
        // Добавьте обновление матча
        onHide();
    };

    const handleModalHide = () => {
        onHide(); // Закрыть модальное окно
    };

    return (
        <Modal
            show={show}
            onHide={handleModalHide} // Используем обработчик onHide для сброса состояния поиска при закрытии окна
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {searchById ? 'Поиск афиши по Id' : 'Обновить афишу'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {searchById ? (
                    // Компоненты для поиска по Id
                    <Form>
                        <Form.Control className='mt-3' placeholder={'Введите Id афиши'} />
                    </Form>
                ) : (
                    // Компоненты для обновления матча
                    <Form>
                <Dropdown>
                    <Dropdown.Toggle 
                    className='mt-3' 
                    variant="outline-dark">Выберите домашний клуб</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle 
                    className='mt-3' 
                    variant="outline-dark">Выберите гостевой клуб</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle 
                    className='mt-3' 
                    variant="outline-dark">Выберите игрока домашнего клуба</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle 
                    className='mt-3' 
                    variant="outline-dark">Выберите игрока гостевого клуба</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className='mt-3'
                    placeholder='Введите цитату'
                />
                <Dropdown>
                    <Dropdown.Toggle 
                    className='mt-3' 
                    variant="outline-dark">Выберите стадион</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className='mt-3'
                    placeholder='Введите дату'
                />
                <Form.Control
                    className='mt-3'
                    placeholder='Введите время'
                />
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

export default UpdatePoster;