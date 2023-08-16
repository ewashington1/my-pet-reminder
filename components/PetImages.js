import React, { useState } from "react";
import styled from "styled-components";

const PetImagesContainer = styled.div`
  width: ${(props) =>
    props.isCollapsed
      ? "40px"
      : "100%"}; // Control width based on collapsed state
  transition: width 0.3s ease; // Smooth transition
  border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
  display: flex;
  margin-right: 5px;
  margin-top: 10px;
  margin-left: 5px;
`;

const CollapseButtonContainer = styled.div`
  width: 40px; // Fixed width for collapse button
  background: #cdb4db;
  display: flex;
  align-items: center; // Center button vertically
  justify-content: center; // Center button horizontally
  cursor: pointer;
  font-weight: 1000;
  font-size: 30px;
  color: white;
`;

const ImageGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2-column grid
  grid-gap: 2px; // Gap between each cell
  overflow-y: scroll; // Enable vertical scrolling
`;

const ImageBox = styled.div`
  position: relative;
  padding-top: 100%; // 1:1 Aspect Ratio
  overflow: hidden; // Hide everything outside of the padding area

  img {
    position: absolute; // Make image take up entire padded area
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ImageBoxContainer = styled.div`
  width: 100%; // Always take full width of its parent container
  transition: width 0.3s ease;
  overflow: hidden; // Hide the overflow content
`;

const InfoIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%; // Take full width of the container
`;

export default function PetImages({ pets, onInfoClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <PetImagesContainer isCollapsed={isCollapsed}>
      <ImageGrid>
        {pets.map((pet, index) => (
          <ImageBox key={index}>
            <img src={pet.image} alt={pet.name} />
            <InfoIcon onClick={() => onInfoClick(pet)}>i</InfoIcon>
          </ImageBox>
        ))}
      </ImageGrid>
      <CollapseButtonContainer onClick={() => setIsCollapsed(!isCollapsed)}>
        <CollapseButton>{isCollapsed ? ">" : "<"}</CollapseButton>
      </CollapseButtonContainer>
    </PetImagesContainer>
  );
}
