'use client';

import Task from './Task';
import { useRouter } from 'next/navigation';
import { useTask } from '@/queries/task/use-task';
import { useState } from 'react';
import { Task as TaskType, NewTask } from '@/services/task';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    due_date: '',
    priority: 'low',
    status: 'pending',
  });
  const { useFetchTasks, useCreateTask } = useTask();
  const { data } = useFetchTasks({
    status: filterStatus === "all" ? "" : filterStatus,
    priority: filterPriority,
    q : searchQuery
  });
  const { mutate: createTask } = useCreateTask();

  const handleCreateTask = () => {
    createTask(newTask, {
      onSuccess: () => {
        setIsCreating(false);
        setNewTask({
          title: '',
          description: '',
          due_date: '',
          priority: 'low',
          status: 'pending',
        });
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Task
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {isCreating && (
        <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Task Title"
            />
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Task Description"
            />
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'pending' | 'in_progress' | 'completed' })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {data?.data?.map((task: Task) => (
          <Task
            key={task.id}
            task={task}
          />
        ))}
      </div>

      {data?.data?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
        </div>
      )}
    </div>
  );
} 