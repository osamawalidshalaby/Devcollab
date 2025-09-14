import {createBrowserRouter , Navigate, RouterProvider } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import { GloalStyle } from "./styles/GlobalStyles"
import Login from "./pages/Login"
import SignupPage from "./pages/SignupPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import  { Toaster } from "react-hot-toast"
import ProtectingRoutes from "./components/ProtectRoutes"
import Session from "./pages/Session/Session"
import HomePage from "./pages/Session/HomePage.jsx"
import PageNotFound from "./components/PageNotFound"
import DashboardPage from "./pages/Dashboard.jsx"
import LandingPage from "./pages/LandingPage.jsx"


const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/landing',
    element: <LandingPage />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    element: <ProtectingRoutes />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/app" />
          },
          {
            path: "/app",
            element: <HomePage />,
          },
          {
            path: 'dashboard',  
            element: <DashboardPage />
          },
          {
            path: "session/:id",  
            element: <Session />
          }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GloalStyle />
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
