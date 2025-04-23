import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, Task, NewTask, updateTask, getTaskCount } from "@/services/task";
import { API_ENDPOINTS } from "@/utils/api-endpoints";

export const useTask = () => {
    const { TASK_LIST } = API_ENDPOINTS;
    const queryClient = useQueryClient();

    const useFetchTasks = (filters :any) => {
        return useQuery({
            queryKey: [TASK_LIST,filters],
            queryFn: () => getTasks(filters),
        })
    };

    const useCreateTask = () => {
        return useMutation({
            mutationFn: (task: NewTask) => createTask(task),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [TASK_LIST],
                });
            }
        });
    };

    const useUpdateTask = () => {
        return useMutation({
            mutationFn: ({id,task}:any) => updateTask({id,task}),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [TASK_LIST],
                });
            }
        });
    };

    const useDeleteTask = () =>{
        return useMutation({
            mutationFn: (id: string) => deleteTask(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [TASK_LIST],
                });
            }
        })
    }

    const useTaskCount = () => {
        return useQuery({
            queryKey: ['taskCount'],
            queryFn: () => getTaskCount(),
        })
    }
    return { useFetchTasks,useCreateTask,useUpdateTask, useDeleteTask, useTaskCount };
};