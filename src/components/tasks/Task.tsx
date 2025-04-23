'use client';

import { useTask } from '@/queries/task/use-task';
import { useState } from 'react';


export default function Task({task}:{
  task :any
}) {
  const {id,title, description, dueDate, priority, status} = task
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title,
    description,
    dueDate,
    priority,
    status,
  });

  const {useUpdateTask, useDeleteTask} = useTask();
  const { mutate } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const handleUpdate = () => {
    mutate({id, task:editedTask});
    setIsEditing(false);
  };

  const handleDelete  = () => {
    deleteTask(id);
  }
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Task Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Task Description"
          />
          <input
            type="datetime-local"
            value={editedTask.dueDate}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as 'Pending' | 'In Progress' | 'Completed' })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <div className="flex space-x-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(priority)}`}>
                {priority}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          </div>
          <p className="text-gray-600">{description}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Due: {new Date(dueDate).toLocaleString()}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 