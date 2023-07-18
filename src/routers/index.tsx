import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Room from "../pages/Room";
import { HOME_ROUTE, REG_ROUTE, ROOM_ROUTE } from "./routers";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  let publicRoutes = useRoutes([
    {
      path: HOME_ROUTE,
      element: <Home />,
    },
    {
      path: REG_ROUTE,
      element: <Home />,
    },
    {
      path: ROOM_ROUTE + '/:id',
      element: <Room />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div className="container">
      {publicRoutes} 
    </div>
  );
};