import cookieCutter from 'cookie-cutter';
// assets
import { IconBrandChrome, IconDashboard, IconDeviceAnalytics, IconHelp, IconSitemap, IconUsers } from '@tabler/icons';
import { store } from '../store';
import configData from '../config';
import api from '../utils/api';
// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconUsers: IconUsers
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

var dashboard = {};
const is_admin = cookieCutter.get('is_admin');


if (is_admin) {
  
    dashboard = {
        id: 'dashboard',
        type: 'group',
        // title:'Dashboard',
        children: [
            {
                id: 'default',
                title: 'Dashboard',
                type: 'item',
                url: '/dashboard',
                icon: icons['IconDashboard'],
                breadcrumbs: false
            },
            {
                id: 'Licences',
                title: 'Licence Details',
                type: 'item',
                url: '/Licences',
                icon: icons['IconSitemap'],
                breadcrumbs: true
            },
            {
                id: 'sample-page',
                title: 'Communication Units',
                type: 'item',
                url: '/CommunicationUnits',
                icon: icons['IconBrandChrome'],
                breadcrumbs: true
            },
            {
                id: 'MyCCIs',
                title: 'MyCCIs Info',
                type: 'item',
                url: '/MyCCIs',
                icon: icons['IconDeviceAnalytics'],
                breadcrumbs: true
            },
            {
                id: 'UserData',
                title: 'Users',
                type: 'item',
                url: '/users',
                icon: icons['IconUsers'],
                breadcrumbs: true
            }
        ]
    };
}else{
    dashboard = {
        id: 'dashboard',
        type: 'group',
        // title:'Dashboard',
        children: [
            {
                id: 'default',
                title: 'Dashboard',
                type: 'item',
                url: '/dashboard',
                icon: icons['IconDashboard'],
                breadcrumbs: false
            },
            {
                id: 'Licences',
                title: 'Licence Details',
                type: 'item',
                url: '/Licences',
                icon: icons['IconSitemap'],
                breadcrumbs: true
            },
            
        ]
    };
}

export { dashboard };
