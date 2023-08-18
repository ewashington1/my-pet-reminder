import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const DropdownHeader = styled.div`
  background-color: #ffdfeb;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  display: flex; // Added for aligning title and arrow
  justify-content: space-between; // Added for aligning title and arrow
  border-radius: 10px;
`;

const Arrow = styled.div`
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.isOpen
      ? "transform: rotate(180deg);"
      : "transform: rotate(0deg);"}// Rotate arrow based on isOpen
`;

const Task = styled.div`
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  color: grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #a2d2ff;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red; // You can style this as you like
  margin-left: 10px;
`;

export default function TaskDropdown({ title, tasks, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        {title}
        <Arrow isOpen={isOpen}>&#9660;</Arrow> {/* Dropdown arrow */}
      </DropdownHeader>{" "}
      {isOpen &&
        Array.isArray(tasks) &&
        tasks.map(
          (task, index) =>
            task && (
              <Task key={index}>
                <div>
                  <Checkbox type="checkbox" />
                  {task.title} - {task.petName} - {task.dateTime}
                </div>
                <div>
                  <MoreButton onClick={() => onEdit(task, index)}>
                    Edit
                  </MoreButton>
                  <DeleteButton onClick={() => onDelete(task, index)}>
                    Delete
                  </DeleteButton>{" "}
                  {/* Added delete button */}
                </div>
              </Task>
            )
        )}
    </DropdownContainer>
  );
}
