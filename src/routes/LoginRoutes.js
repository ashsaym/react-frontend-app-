import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import GuestGuard from './../utils/route-guard/GuestGuard';
import MinimalLayout from './../layout/MinimalLayout';
import NavMotion from './../layout/NavMotion';
import Loadable from '../ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/login')));

const ForgotPasswordEmailPage = Loadable(lazy(() => import('../views/pages/authentication/forgot-password/emailPage')));
const ForgotPasswordVerficationPage = Loadable(lazy(() => import('../views/pages/authentication/forgot-password/verificationPage')));
const ForgotPasswordResetPage = Loadable(lazy(() => import('../views/pages/authentication/forgot-password/passwordResetPage')));

//-----------------------|| AUTH ROUTING ||-----------------------//

const LoginRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/login']}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <NavMotion>
                        <GuestGuard>
                            <Route exact path="/login" component={AuthLogin} />
                            <Route exact path="/login/forgot/email" component={ForgotPasswordEmailPage} />
                            <Route exact path="/login/forgot/verfication" component={ForgotPasswordVerficationPage} />
                            <Route exact path="/login/forgot/reset" component={ForgotPasswordResetPage} />
                        </GuestGuard>
                    </NavMotion>
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default LoginRoutes;
