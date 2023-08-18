import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-top: 5px solid #ffafcc;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #bde0fe;
  outline: 2px solid #ffdfeb; // Added outline
  transition: border-color 0.3s, outline-color 0.3s;

  &:focus {
    border-color: #ffafcc;
    outline-color: #ffafcc; // Change outline color on focus
  }
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #bde0fe;
  outline: 2px solid #ffdfeb; // Added outline
  resize: vertical;
  transition: border-color 0.3s, outline-color 0.3s;

  &:focus {
    border-color: #ffafcc;
    outline-color: #ffafcc; // Change outline color on focus
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #bde0fe;
  outline: 2px solid #ffdfeb; // Added outline
  background-color: #ffdfeb;
  transition: border-color 0.3s, outline-color 0.3s;

  &:focus {
    border-color: #ffafcc;
    outline-color: #ffafcc; // Change outline color on focus
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #ffafcc;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffdfeb;
  }
`;

export default function TaskDetailsModal({ task, onClose, index, pets }) {
  const [localIsDaily, setIsDaily] = useState(task.isDaily || false);
  const [title, setTitle] = useState(task.title || "");
  const [details, setDetails] = useState(task.details || "");
  const [dateTime, setDateTime] = useState(task.dateTime || "");
  const [petName, setPetName] = useState(task.petName || ""); // Add petName state

  // add for petName
  const handleSave = () => {
    // Logic to save the task details
    const taskToSave = {
      isDaily: localIsDaily,
      title: title,
      details: details,
      dateTime: dateTime,
      petName: petName,
    };
    if (index === null) {
      if (!localIsDaily) {
        const upcomingTasks =
          JSON.parse(localStorage.getItem("upcomingTasks")) || [];
        upcomingTasks.push(taskToSave);
        localStorage.setItem("upcomingTasks", JSON.stringify(upcomingTasks));
      } else {
        const dailyTasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];
        dailyTasks.push(taskToSave);
        localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
      }
    } else {
      if (!localIsDaily) {
        const upcomingTasks =
          JSON.parse(localStorage.getItem("upcomingTasks")) || [];
        upcomingTasks[index] = taskToSave; // Replace the task at the given index
        localStorage.setItem("upcomingTasks", JSON.stringify(upcomingTasks));
      } else {
        const dailyTasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];
        dailyTasks[index] = taskToSave; // Replace the task at the given index
        localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
      }
    }

    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Edit Task</h2>
        <FormField>
          <Label>Title</Label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>Pet Name</Label>
          <select
            required
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          >
            <option value="">Select a pet</option>
            {pets.map((pet, i) => (
              <option key={i} value={pet.name}>
                {pet.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField>
          <Label>Details</Label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>
            <input
              type="checkbox"
              checked={localIsDaily}
              onChange={() => setIsDaily(!localIsDaily)}
            />
            Daily Task?
          </Label>
          {localIsDaily ? (
            <input
              required
              type="time"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          ) : (
            <input
              required
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          )}
        </FormField>

        <button onClick={handleSave}>Save</button>
      </ModalContainer>
    </ModalOverlay>
  );
}
