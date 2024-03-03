import React, { useEffect, useState } from 'react';
import './NewsPage.css'; // Подключаем файл стилей
import twente from '../assets/twente.png'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneNews } from '../http/newsAPI';
const about = () => {
    return (        
    <div className="news-page-container">
            <div className="news-div">                
            <input readOnly={true} className="news-border" placeholder="Спартак Москва"/>
                <div className="news-info">                    
                <div className="news-header">
                        <h1 className="news-title">Форвард «Твенте» близок к переходу в «Спартак»</h1>                        
                        <div>
                            <p className="news-text">Если взглянуть на таблицу лучших снайперов голландского чемпионата,                                    то на
                                    границе топ-10 с семью забитыми мячами соседствуют провалившийся в «Спартаке» Гус Тил и                                    костариканский нападающий Манфред Угальде, который вот-вот станет красно-белым и
                                    обойдется                                    москвичам в 14 миллионов евро. Никаких намеков и тайных знаков в этом искать не стоит.
                                    Это                                    совсем разные истории, и рискну предположить, что у 21-летнего футболиста «Твенте» в РПЛ
                                    получится гораздо лучше, чем у его предшественника.</p>                                
                        </div>  
                        <div>
                        <img className="img-foto" src={twente}  style = {{width:'340px', height:'200px' }}alt="Фото"/> 
                        </div>                 
                        </div>
                </div>            
                </div>
            <div className="text-inner">                
            <p className="after-all-text">Также посмотрите остальные свежие новости</p>
                <div className="footer">                    
                <Button 
                variant='outline-light'
                style={{borderRadius:'20px', textAlign:'left', height:'60px', width:'800px'}}
                
                >
                
                <p style={{fontSize:'12px'}}>29 января 2024</p>  
                <p style={{marginTop:'-10px'}}>«Спартаку» нужно продавать Мозеса</p>
                </Button>
                <Button
                className='mt-4' 
                variant='outline-light'
                style={{borderRadius:'20px', textAlign:'left', height:'60px', width:'800px'}}
                >
                
                <p style={{fontSize:'12px'}}>27 января 2024</p>  
                <p style={{marginTop:'-10px'}}>Поздравляем Дениса Глушакова!</p>
                </Button>               
                </div>
            </div>        
        </div>
    );};
export default about;
