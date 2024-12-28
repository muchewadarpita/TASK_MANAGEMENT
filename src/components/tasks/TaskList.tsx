import React from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Check, Trash2, X } from 'lucide-react';

export function TaskList() {
  const { tasks, toggleTaskCompletion, deleteTask } = useTask();

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No tasks yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
        >
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${task.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`p-2 rounded-full ${
                task.isCompleted
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {task.isCompleted ? <Check size={18} /> : <X size={18} />}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}