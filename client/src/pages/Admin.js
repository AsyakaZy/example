import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateMatch from '../components/modals/createMatch';
import CreateNews from '../components/modals/createNews';
import UpdateMatch from '../components/modals/updateMatch';
import UpdateNews from '../components/modals/updateNews';
import DeleteMatch from '../components/modals/deleteMatch';
import DeleteNews from '../components/modals/deleteNews';
import CreatePoster from '../components/modals/createPoster';
import UpdatePoster from '../components/modals/updatePosters';
import DeletePoster from '../components/modals/deletePoster';

const Admin = () => {
    const [newsVisible, setNewsVisible] = useState(false)
    const [news1Visible, setNews1Visible] = useState(false)
    const [news2Visible, setNews2Visible] = useState(false)
    const [matchVisible, setMatchVisible] = useState(false)
    const [match1Visible, setMatch1Visible] = useState(false)
    const [match2Visible, setMatch2Visible] = useState(false)
    const [posterVisible, setPosterVisible] = useState(false)
    const [poster1Visible, setPoster1Visible] = useState(false)
    const [poster2Visible, setPoster2Visible] = useState(false)
    return (
        <Container className='d-flex flex-column mt-3'>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setNewsVisible(true)}
           >Добавить новость</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setNews1Visible(true)}
           >Изменить новость</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setNews2Visible(true)}
           >Удалить новость</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setMatchVisible(true)}
           >Добавить матч</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setMatch1Visible(true)}
           >Изменить матч</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setMatch2Visible(true)}
           >Удалить матч</Button> 
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setPosterVisible(true)}
           >Добавить афишу</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setPoster1Visible(true)}
           >Изменить афишу</Button>
           <Button 
           style={{width:'800px', margin:'auto'}}
           variant='outline-light' 
           className='mt-3 p-2'
           onClick={() => setPoster2Visible(true)}
           >Удалить афишу</Button> 
           <CreateMatch show = {matchVisible} onHide={() => setMatchVisible(false)}/>
           <CreateNews show = {newsVisible} onHide={() => setNewsVisible(false)}/>
           <CreatePoster show = {posterVisible} onHide={() => setPosterVisible(false)}/>
           <UpdateMatch show={match1Visible} onHide={() => setMatch1Visible(false)}/>
           <UpdateNews show={news1Visible} onHide={() => setNews1Visible(false)}/>
           <UpdatePoster show = {poster1Visible} onHide={() => setPoster1Visible(false)}/>
           <DeleteMatch show={match2Visible} onHide={() => setMatch2Visible(false)}/>
           <DeleteNews show={news2Visible} onHide={() => setNews2Visible(false)}/>
           <DeletePoster show = {poster2Visible} onHide={() => setPoster2Visible(false)}/>
        </Container>
    );
};

export default Admin;