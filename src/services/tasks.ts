import api from './api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get('/tasks');
    return data;
  },

  async createTask(title: string, description?: string): Promise<Task> {
    const { data } = await api.post('/tasks', { title, description });
    return data;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const { data } = await api.put(`/tasks/${id}`, updates);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
};