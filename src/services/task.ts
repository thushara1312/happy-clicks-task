import { API_ENDPOINTS } from "@/utils/api-endpoints";
import api from "@/lib/axios";

export interface Task {
    id: string;
    title: string;
    description: string;
    due_date: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'pending' | 'in_progress' | 'completed';
}

export interface NewTask {
    title: string;
    description: string;
    due_date: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_progress' | 'completed';
}

export const getTasks = async (filters :any) => {
    const { TASK_LIST } = API_ENDPOINTS;
    const params = new URLSearchParams();
    if (filters) {
        Object.keys(filters).forEach((key) => {
            params?.append(key, filters[key]);
        })
    }
    const response = await api.get(TASK_LIST + `?${params.toString()}`);    
    return response?.data;
}

export const createTask = async (task: NewTask) => {
    const { TASK_LIST } = API_ENDPOINTS;
    const response = await api.post(TASK_LIST, task);
    const { status_code, message, data } = response?.data;
    if(status_code === 6001) {
        throw { message, errors: data };
    }
    return response?.data;
}

export const updateTask = async ({id,task}:any) => {
    const { GET_TASK } = API_ENDPOINTS;
    const response = await api.put(GET_TASK?.replace(':id',id), task);
    return response?.data;
}

export const deleteTask = async (id: string) => {
    const { GET_TASK } = API_ENDPOINTS;
    const response = await api.delete(GET_TASK?.replace(':id',id));
    return response?.data;
}

export const getTaskCount = async () => {
    const { TASK_COUNT } = API_ENDPOINTS;
    const response = await api.get(TASK_COUNT);
    return response?.data;
}