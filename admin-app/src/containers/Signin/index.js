import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(!auth.authenticate){
    //         dispatch(isUserLoggedIn());
    //     }
    // }, []);

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            // email: 'riz@gmail.com', 
            // password:'123456'
            email, password
        }

        dispatch(login(user));
        // login(user);
    }

    if(auth.authenticate){
        return <Navigate to="/" />
    }

  return (
    <Layout>
        <Container>
            <Row style={{ marginTop: '50px'}}>
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userLogin}>
                        <Input 
                            label='Email'
                            placeholder='Email'
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            label='Password'
                            placeholder='Password'
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Layout>
  )
}
