import React from 'react';
import {Container, Spinner} from 'react-bootstrap';

function Loading() {
    return (
        <Container
        className="d-flex justify-content-center p-5 h-100"
        width="100%"
      >
        <Spinner animation="border" />
      </Container>
    );
}

export default Loading;