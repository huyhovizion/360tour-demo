import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './list';

function Menu({ onCardClick }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCardClick = (newTexture) => {
    onCardClick(newTexture);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Vizion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <List onCardClick={handleCardClick} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;