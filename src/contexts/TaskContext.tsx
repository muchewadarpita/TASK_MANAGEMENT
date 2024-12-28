import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { taskService, Task } from '../services/tasks';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Omit<Task, '_id'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const addTask = async (title: string, description?: string) => {
    try {
      const newTask = await taskService.createTask(title, description);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Omit<Task, '_id'>>) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates);
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    
    try {
      await updateTask(id, { isCompleted: !task.isCompleted });
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};