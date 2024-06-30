import './App.css'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { CreateUser } from './components/UserCreate'
import { ProtectedLayout } from './components/ProtectedLayout'
import { Login } from './components/Login'
import { Menu } from './components/Menu'
import { Message } from './components/Message'
import { UserDetail } from './components/UserDetail'

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/menu' element={<ProtectedLayout>
            <Menu />
          </ProtectedLayout>}>

          </Route>

          <Route path='/profile' element={<ProtectedLayout>
            <UserDetail />
          </ProtectedLayout>}>

          </Route>

          <Route path='/message' element={<ProtectedLayout>
            <Message />
          </ProtectedLayout>}>

          </Route>

          <Route path='/login' element={
            <Login />
          }>
            
          </Route>

          <Route path='/create' element={
            <CreateUser />
          }>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
