import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

//page routing
const ComUnits = Loadable(lazy(() => import('../views/ComUnits')));
const MyCCIs = Loadable(lazy(() => import('../views/MyCCIs')));
const Licences = Loadable(lazy(() => import('../views/Licences')));
const Details = Loadable(lazy(()=>import('../views/Details')))
const Users = Loadable(lazy(()=>import('../views/Users')))

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',
                '/CommunicationUnits',
                '/MyCCIs',
                '/Licences',
                '/details/:SerialNumber',
                '/users'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard" component={DashboardDefault} />
                        <Route path="/CommunicationUnits" component={ComUnits} />
                        <Route path="/MyCCIs" component={MyCCIs} />
                        <Route path="/Licences" component={Licences} />
                        <Route path="/details/:SerialNumber" component={Details}/>
                        <Route path="/users" component={Users} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
