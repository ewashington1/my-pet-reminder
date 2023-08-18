import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskDropdown from "./TaskDropdown";

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
  max-height: 88vh;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
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
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;

  margin-left: 3px;
`;

const ImageGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2-column grid
  grid-gap: 2px; // Gap between each cell
  overflow-y: scroll; // Enable vertical scrolling
  padding: 10px; // Padding between the images and the container

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cdb4db;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: lightgrey;
  }
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

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%; // Take full width of the container
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out; // Smooth transition for modal appearance
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Soft shadow for a modern look
  max-width: 80%; // Control the maximum width
  width: 600px; // Specific width, adjust as needed
`;

const CloseButton = styled.button`
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1.5rem;
  color: #888; // Subtle color for the close button
  position: absolute; // Positioning close button
  right: 15px;
  top: 15px;
  border-radius: 100%;
  padding: 3px;
`;
const InfoIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopBar = styled.div`
  background-color: #ffafcc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const PetName = styled.div`
  font-weight: bold;
  color: black;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  mix-blend-mode: soft-light;
  font-size: 2rem;
`;
const PetAge = styled.div`
  font-weight: bold;
  color: black;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  mix-blend-mode: soft-light;
  font-size: 1rem;
`;

export default function PetImages({
  pets,
  onInfoClick,
  upcomingTasks,
  dailyTasks,
  onEdit, // Added onEdit prop
  onDelete, // Added onDelete prop
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filteredUpcomingTasks, setFilteredUpcomingTasks] = useState([]);
  const [filteredDailyTasks, setFilteredDailyTasks] = useState([]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null); // Optionally reset the selected pet
  };

  useEffect(() => {
    if (selectedPet) {
      setFilteredUpcomingTasks(
        upcomingTasks.filter(
          (task) => task && task.petName === selectedPet.name
        )
      );
      setFilteredDailyTasks(
        dailyTasks.filter((task) => task.petName === selectedPet.name)
      );
    }
  }, [selectedPet, upcomingTasks, dailyTasks]);

  return (
    <PetImagesContainer isCollapsed={isCollapsed}>
      <ImageGrid>
        {pets.map((pet, index) => (
          <ImageBox key={index}>
            <img
              src={
                pet.image ||
                "https://d2zia2w5autnlg.cloudfront.net/125664/606f64cbaa363-large"
              }
              alt={pet.name}
            />
            <InfoIcon
              onClick={() => {
                setSelectedPet(pet);
                setIsModalOpen(true);
              }}
            >
              i
            </InfoIcon>
          </ImageBox>
        ))}
      </ImageGrid>
      <Modal isOpen={isModalOpen}>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>{" "}
        {/* Close button */}
        <ModalContent>
          <TopBar>
            <PetName>{selectedPet?.name}</PetName> {/* Pet name */}
            <PetAge>Age: {selectedPet?.age}</PetAge> {/* Pet age */}
          </TopBar>
          <TaskDropdown
            title="Upcoming Tasks"
            tasks={filteredUpcomingTasks}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <TaskDropdown
            title="Daily Tasks"
            tasks={filteredDailyTasks}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </ModalContent>
      </Modal>
      <CollapseButtonContainer onClick={() => setIsCollapsed(!isCollapsed)}>
        <CollapseButton>{isCollapsed ? ">" : "<"}</CollapseButton>
      </CollapseButtonContainer>
    </PetImagesContainer>
  );
}
