export const API_ENDPOINTS = {
    // Auth endpoints
    SIGN_IN: "/auth/login/",
    SIGN_UP: "/auth/register/",
    TASK_LIST : "/tasks/",
    GET_TASK : "/tasks/:id/",
    TASK_COUNT : "/tasks/dashboard-count/"
} as const;
