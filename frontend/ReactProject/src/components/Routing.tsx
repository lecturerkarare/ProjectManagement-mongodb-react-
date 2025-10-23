import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home } from './Home';
import Layout from './Layout';
import { TaskList } from '../pages/tasks/TaskList';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import PrivateRoute from './PrivateRoute';
import { ProjectList } from '../pages/projects/ProjectList';
import TicketList from '../pages/tickets/TicketList';
import AdminPrivateRoute from './AdminPrivateRoute';

import Profile from '../pages/auth/Profile';
import React from 'react';
import { MemberList } from '../pages/members/MemberList';
import Documents from '../pages/Documents/Documents';
import { RoleList } from '../pages/Roles/RoleList';

export const Routing: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />

          <Route
            path="/app/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<PrivateRoute>{<Home />}</PrivateRoute>} />

                  <Route path="projects" element={<PrivateRoute>{<ProjectList />}</PrivateRoute>} />

                  <Route
                    path="members"
                    element={<AdminPrivateRoute>{<MemberList />}</AdminPrivateRoute>}
                  />

                  <Route path="profile" element={<PrivateRoute>{<Profile />}</PrivateRoute>} />
                  <Route path="documents" element={<PrivateRoute>{<Documents />}</PrivateRoute>} />
                  <Route path="roles" element={<PrivateRoute>{<RoleList />}</PrivateRoute>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
