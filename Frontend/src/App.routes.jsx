import{createBrowserRouter} from "react-router"
import Login from "./features/Auth/pages/Login"
import Register from "./features/Auth/pages/Register"
import Protected from "./features/Auth/components/protected"







export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><h1>home page</h1></Protected>
    }
])