// import { Post } from './components/Post/Post'
import { Profile } from './components/Profile/Profile'
import { Register } from './components/Register/Register'
import {
  BrowserRouter as Router,
  Routes,
  // Navigate,
  Route,
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LoginLogout } from './components/LoginLogout/LoginLogout'
import {LoginWithForm} from './components/LoginLogout/LoginWithForm/LoginWithForm'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginLogout />} />
            <Route path='/loginwithform' element={<LoginWithForm />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
