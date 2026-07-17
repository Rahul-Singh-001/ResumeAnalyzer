import {RouterProvider} from 'react-router'
import {router} from "./App.routes"
import { InterviewProvider } from "./features/interview/interview.context"

import { AuthProvider } from './features/Auth/auth.context'
const App = () => {
  return (
     <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App