import {RouterProvider} from 'react-router'
import {router} from "./App.routes"

import { AuthProvider } from './features/Auth/auth.context'
const App = () => {
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    
    </>
  )
}

export default App