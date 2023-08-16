import styled from "styled-components";
import PetImages from "../components/PetImages";
import TaskDropdown from "../components/TaskDropdown";
import TaskDetailsModal from "@/components/TaskDetails";
import React, { useState, useEffect } from "react";
import AddPetModal from "../components/AddPetModal";

const TopBar = styled.div`
  background-color: #ffafcc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const AppName = styled.div`
  font-weight: bold;
  color: black;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const AddPetButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 5px 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const HomePageContainer = styled.div`
  display: flex;
`;

const RightSection = styled.div`
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
`;
const AddTaskButton = styled.button`
  position: fixed; // Fix the position relative to the browser window
  right: 20px; // 20px from the right
  bottom: 20px; // 20px from the bottom
  background-color: #ff5757;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000; // To ensure it's above other elements
`;

export default function Home() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [pets, setPets] = useState([]); // Define the pets state here
  const [isDaily, setIsDaily] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState();
  const [dailyTasks, setDailyTasks] = useState();

  useEffect(() => {
    const savedPets = JSON.parse(localStorage.getItem("pets"));
    if (savedPets) {
      setPets(savedPets);
    }
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("upcomingTasks");
    if (savedTasks) {
      setUpcomingTasks(JSON.parse(savedTasks)); // Parse the savedTasks JSON
    }
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("dailyTasks");
    if (savedTasks) {
      setDailyTasks(JSON.parse(savedTasks)); // Parse the savedTasks JSON
    }
  }, []);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToLocalStorage(); // Call without passing any arguments
  };

  const editTask = (task, index) => {
    const newTasks = [...tasks];
    newTasks[index] = task;
    setTasks(newTasks);
    saveTasksToLocalStorage(); // Call without passing any arguments
  };

  const handleOpenModal = () => {
    setEditingIndex(null);
    setIsDaily(false);
    setTitle("");
    setDetails("");
    setDateTime("");
    setSelectedTask({});
  };
  const handleEditTask = (task, index) => {
    setIsDaily(task.isDaily);
    setTitle(task.title);
    setDetails(task.details);
    setDateTime(task.dateTime);
    setEditingIndex(index); // Set the editingIndex
    setSelectedTask(task);
  };
  const handleAddPet = (pet) => {
    const newPets = [...pets, pet]; // Now pets is accessible here
    setPets(newPets);
    localStorage.setItem("pets", JSON.stringify(newPets)); // Save to local storage
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    const newUpdated = JSON.parse(localStorage.getItem("upcomingTasks"));
    const updatedUpcomingTasks = newUpdated === null ? [] : newUpdated;
    setUpcomingTasks(updatedUpcomingTasks || []);
    const newDaily = JSON.parse(localStorage.getItem("dailyTasks"));
    const updatedDailyTasks = newDaily === null ? [] : newDaily;
    setDailyTasks(updatedDailyTasks || []);
  };

  return (
    <div>
      <TopBar>
        <AppName>Pet Reminder</AppName>
        <AddPetButton onClick={() => setIsAddPetModalOpen(true)}>
          Add Pet
        </AddPetButton>
      </TopBar>
      {isAddPetModalOpen && (
        <AddPetModal
          onClose={() => setIsAddPetModalOpen(false)}
          onAdd={handleAddPet}
        />
      )}
      <HomePageContainer>
        <PetImages pets={pets} />
        <RightSection>
          <TaskDropdown
            title="Daily Tasks"
            tasks={dailyTasks || []}
            onEdit={handleEditTask}
          />
          <TaskDropdown
            title="Upcoming Reminders"
            tasks={upcomingTasks || []}
            onEdit={handleEditTask}
          />
        </RightSection>
      </HomePageContainer>
      <AddTaskButton onClick={handleOpenModal}>+</AddTaskButton>

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          index={editingIndex}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
