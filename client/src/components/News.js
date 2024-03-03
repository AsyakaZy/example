import React, { useContext } from 'react';
import { Card} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const News = observer(() => {
    const { news } = useContext(Context);

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('ru-RU', options);
    };

    return (
        <div>
            <h5 style={{ color: 'white', fontWeight: 'bold', marginTop: '60px', marginLeft: '300px' }}>Новости</h5>
            <div style={{ display: 'flex', marginTop: '25px', marginLeft: '250px', width: '800px' }}>
                {news.news.map(item => (
                    <Card key={item.id} style={{ width: '300px', alignItems: 'center', background: 'transparent', marginBottom: '20px' }}>
                        <Card.Img style={{ width: '100%', height: '200px', objectFit: 'cover' }} variant="top" src={`http://localhost:5000//${item.photo}`} />
                        <Card.Body>
                            <Card.Title style={{ color: 'white' }}>{item.heading}</Card.Title>
                            <p style={{ color: 'white', marginBottom: '10px' }}>{formatDate(item.date)}</p>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
});

export default News;




