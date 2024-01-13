const routeConfig = {
    dashboard: '/dashboard',
    restro: {
        all: '/dashboard/restro',
        create: '/dashboard/restro/create',
        edit: (restroId) => `/dashboard/restro/${restroId}/edit`,
        owner: {
            view: (restroId) => `/dashboard/restro/${restroId}/owner`,
            addManager: (restroId) => `/dashboard/restro/${restroId}/manager/add`,
            editManager: (restroId, managerId) => `/dashboard/restro/${restroId}/manager/${managerId}/edit`,
        },
        manager: {
            view: (restroId, managerId) => `/dashboard/restro/${restroId}/manager/${managerId}`,
            addStaff: (restroId, managerId) => `/dashboard/restro/${restroId}/manager/${managerId}/staff/add`,
            editStaffMember: (restroId, managerId, staffMemberId) => `/dashboard/restro/${restroId}/manager/${managerId}/staff/${staffMemberId}/edit`
        }
    },
};

export default routeConfig;
