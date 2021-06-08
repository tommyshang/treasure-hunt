import React from 'react';
import { Card, Row, Col } from 'antd';

import { PICTURE_URL_PREFIX } from 'constants/constants';

const {Meta} = Card;


const Item = (props) => {
  const {Products, changeData} = props;


  return(
    <Row>
    {
      Products?.map((item, id) => {
        for(const [key, value] of Object.entries(item.picture_urls)){
             return (
              <Col span = {8} key = {id}> 
              <Card 
                hoverable
                onClick = {() => changeData(item)}
                style = {{width : 250, marginBottom: 50}}
                cover = {<img alt="item" src= { PICTURE_URL_PREFIX + `${value}`} />}
                >
               <Meta title={item?.title} description= {`$${item?.price}`}/>
              </Card>
           </Col>  
             ) 
          }
      })
    }
    </Row>
  )
}

export default Item;

