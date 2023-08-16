import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const DropdownHeader = styled.div`
  background-color: #a2d2ff;
  padding: 5px 10px;
  cursor: pointer;
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

export default function TaskDropdown({ title, tasks, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>{title}</DropdownHeader>
      {isOpen &&
        tasks.map((task, index) => (
          <Task key={index}>
            <div>
              <Checkbox type="checkbox" />
              {task.title} - {task.petName} - {task.dateTime}
            </div>
            <MoreButton onClick={() => onEdit(task, index)}>Edit</MoreButton>
          </Task>
        ))}
    </DropdownContainer>
  );
}
