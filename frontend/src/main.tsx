import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ConversationProvider } from './contexts/ConversationContext.tsx';
import { NavbarProvider } from './contexts/NavbarContext.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';
import { DarkModeProvider } from './contexts/DarkModeContext.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <NavbarProvider>
        <ConversationProvider>
          <DarkModeProvider>
            <RouterProvider router={router} />
          </DarkModeProvider>
        </ConversationProvider>
      </NavbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
