import React, { useContext, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import Poster from '../components/Poster';
import NavPanel from '../components/NavPanel';
import Match from '../components/Match';
import News from '../components/News';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchNews} from '../http/newsAPI';
import { fetchMatches } from '../http/matchAPI';
import { fetchPosters } from '../http/posterAPI';

const Shop = observer(() => {
    const {news} = useContext(Context)
    const {match} = useContext(Context)
    const {poster} = useContext(Context)

    useEffect(() => {
        fetchNews().then(data => news.setNews(data))
    }, [])

    useEffect(() => {
        fetchMatches().then(data => match.setMatches(data))
    }, [])

    useEffect(() => {
        fetchPosters().then(data => poster.setPosters(data))
    }, [])

    return(
        <Container>
            <Col md = {3}>
            <Poster/>
            <NavPanel/>
            <Match/>
            </Col>
            <Col md = {9}>
            <News/>
            </Col>
        </Container>
    );
});

export default Shop;