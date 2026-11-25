import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

import { serverUrl } from '@/config';

const Scoreboard = () => import('@/views/Scoreboard.vue');
const LiveScoreboard = () => import('@/views/LiveScoreboard.vue');
const TeamScoreboard = () => import('@/views/TeamScoreboard.vue');

const AdminLogin = () => import('@/views/AdminLogin.vue');
const AdminScoreboard = () => import('@/views/AdminScoreboard.vue');
const TaskAdmin = () => import('@/views/TaskAdmin.vue');
const TeamAdmin = () => import('@/views/TeamAdmin.vue');
const AdminTeamTaskLog = () => import('@/views/AdminTeamTaskLog.vue');

const routes = [
    {
        path: '/',
        name: 'index',
        component: Scoreboard,
    },
    {
        path: '/live/',
        name: 'live',
        component: LiveScoreboard,
        meta: {
            layout: 'empty-layout',
        },
    },
    {
        path: '/team/:id/',
        name: 'team',
        component: TeamScoreboard,
    },
    {
        path: '/admin/login/',
        name: 'adminLogin',
        component: AdminLogin,
    },
    {
        path: '/admin/',
        name: 'admin',
        component: AdminScoreboard,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/task/:id/',
        name: 'taskAdmin',
        component: TaskAdmin,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/team/:id/',
        name: 'teamAdmin',
        component: TeamAdmin,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/create_task/',
        name: 'createTask',
        component: TaskAdmin,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/create_team/',
        name: 'createTeam',
        component: TeamAdmin,
        meta: {
            auth: true,
        },
    },
    {
        path: '/admin/teamtask_log/team/:teamId/task/:taskId/',
        name: 'adminTeamTaskLog',
        component: AdminTeamTaskLog,
        meta: {
            auth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

router.beforeEach(async (to) => {
    if (!to.meta.auth) {
        return true;
    }

    try {
        await axios.get(`${serverUrl}/api/admin/status/`);
        return true;
    } catch {
        return { name: 'adminLogin' };
    }
});

export default router;
