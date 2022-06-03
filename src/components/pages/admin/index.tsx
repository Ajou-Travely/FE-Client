import { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import AdminRoute from "@src/routes/admin";
import Admin from "./pages/Admin";
import Travel from "./pages/Travel";
import Post from "./pages/Post";
import User from "./pages/User";
import Notice from "./pages/Notice";
import Event from "./pages/Event";
import { DashboardTemplate } from "../dashboard";

const adminRouter: BreadcrumbsRoute<string>[] = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardTemplate type="ADMIN" />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "/admin/travels",
        element: <Travel />,
      },
      {
        path: "/admin/posts",
        element: <Post />,
      },
      {
        path: "/admin/users",
        element: <User />,
      },
      {
        path: "/admin/notice",
        element: <Notice />,
      },
      {
        path: "/admin/event",
        element: <Event />,
      },
    ],
  },
];

export default adminRouter;
