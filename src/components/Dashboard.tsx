'use client';

import TaskList from './tasks/TaskList';
import { useTask } from '@/queries/task/use-task';


export default function Dashboard() {
  const { useTaskCount } = useTask();
  const { data } = useTaskCount();

  return (  
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
            <p className="text-3xl font-bold text-indigo-600">{data?.data?.total_tasks}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Completed Tasks</h3>
            <p className="text-3xl font-bold text-green-600">{data?.data?.completed_tasks}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-600">{data?.data?.pending_tasks}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600">{data?.data?.in_progress_tasks}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Tasks</h2>
          <TaskList />
        </div>
      </div>
    </div>
  );
} 