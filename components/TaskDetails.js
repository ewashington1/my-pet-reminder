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
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
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
`;

export default function TaskDetailsModal({ task, onClose, index }) {
  const [localIsDaily, setIsDaily] = useState(task.isDaily || false);
  const [title, setTitle] = useState(task.title || "");
  const [details, setDetails] = useState(task.details || "");
  const [dateTime, setDateTime] = useState(task.dateTime || "");
  // add for petName
  const handleSave = () => {
    // Logic to save the task details
    const taskToSave = {
      isDaily: localIsDaily,
      title: title,
      details: details,
      dateTime: dateTime,
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
            Daily Task
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
