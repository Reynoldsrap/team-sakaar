import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import cookies from 'cookiesjs';

import "./Venue.css";
import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Button,
  Form
} from "react-bootstrap";

import Footer from "../Footer/Footer";
import VenueHeader from "./VenueHeader";




function VenueLogin() {

  const axios = require('axios');
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect( () => {
    console.log(`
      username: ${username}
    `)
  })

  const handleSubmit = e => {
    const url = 'http://localhost:3001/venue-login';
  
    e.preventDefault();
    
    axios.post( url, {
        Username: username,
        Password: password,
    })
    .then( res =>  {
        setSubmit(true);
        // console.log(res.data)
        if( res.data.status === parseInt( 401 ) ){
              setStatus( res.data.status )
              console.log( res.data.status)
        }
  
        if( res.data.status === parseInt( 200 ) ){
            setStatus( res.data.status )
            //set cookie and verify
            // document.cookie = `jwt=${res.data.token}`;
            cookies({ jwt: res.data.token })

            history.push(
                `/venue-dashboard`, 
                [ res.data ]
            );
        }
       
    })
    .catch( err => console.log( err ) )
  
  }

  return (
    <div>
      <VenueHeader />
      <Container>
        <Row>
          <Col id="venue-pic-container" className="shadow-lg" />
        </Row>

        <Row>
          <Col className="mt-5 p-5" md={12}>

            <div className="w-75 m-auto">
            <Form id='form' onSubmit={handleSubmit}>
              <InputGroup className="mb-3 shadow">
                <FormControl
                  type='text'
                  value={username}
                  onChange={ e => setUsername(e.target.value) }
                  className="border border-dark"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                />
                <FormControl
                  type='password'
                  value={password}
                  onChange={ e => setPassword(e.target.value) }
                  className="border border-dark"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  required
                />
                <InputGroup.Append>
                  <Button
                    variant="dark"
                    type="submit"
                    className="float-right border border-darl"
                  >
                    Login
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default VenueLogin;
