// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
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
            icon: icons['IconHelp'],
            breadcrumbs: true
        },
        {
            id: 'Licences',
            title: 'Licence Details',
            type: 'item',
            url: '/Licences',
            icon: icons['IconHelp'],
            breadcrumbs: true
        }

    ]
};
