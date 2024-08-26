import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomCard from './card';

function List({ onCardClick }) {
  const textures = [
    [
      "/images/bancol/bc-px.png",
      "/images/bancol/bc-nx.png",
      "/images/bancol/bc-py.png",
      "/images/bancol/bc-ny.png",
      "/images/bancol/bc-pz.png",
      "/images/bancol/bc-nz.png"
    ],
    [
      "/images/studio/st-px.png",
      "/images/studio/st-nx.png",
      "/images/studio/st-py.png",
      "/images/studio/st-ny.png",
      "/images/studio/st-pz.png",
      "/images/studio/st-nz.png"
    ],
    
  ];


  return (
    <ListGroup as="ol" numbered>
      {textures.map((texture, index) => (
        <ListGroup.Item as="li" key={index}>
          <CustomCard onClick={() => onCardClick(texture)} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;