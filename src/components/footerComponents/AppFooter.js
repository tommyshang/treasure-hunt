import React, {Component} from 'react';
import { Link } from "react-router-dom";

import {Col, Row, Layout,Button} from 'antd'

class AppFooter extends Component {
    render() {
        return (
            <Row>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    {/*<a href="" class="footer-links">ABOUT</a>*/}
                    <Button type="text">ABOUT</Button>
                </Col>
                <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    {/*<a href="" className="footer-links">SHOP</a>*/}
                    <Button type="text">SHOP</Button>
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    {/*<a href="" className="footer-links">CONNECT</a>*/}
                    <Button type="text">CONNECT</Button>
                </Col>
            </Row>
        );
    }
}

export default AppFooter;
