import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomCard({ onClick }) {
  return (
    <Card className="bg-dark text-white" onClick={onClick}>
      <Card.Img src="https://cdn.polyhaven.com/asset_img/renders/brown_photostudio_03/lone_monk.png?height=720" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Card title</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}

export default CustomCard;