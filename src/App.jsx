// import { Post } from './components/Post/Post'
import { Register } from './components/Register/Register'
import { AuthProvider } from './context/AuthContext'
// import { LoginLogout } from './components/LoginLogout/LoginLogout'
import { LoginWithForm } from './components/LoginLogout/LoginWithForm/LoginWithForm'
import { Post } from './components/Post/Post'
// import { MyPost } from './components/Post/MyPost'
import { PostsProvider } from './context/PostsContext'
import { LoginWithGoogle } from './components/LoginLogout/LoginWithGoogle/LoginWithGoogle'
import { NavBar } from './components/NavBar/NavBar'
import { Profile } from './components/Profile/Profile'
import {
  BrowserRouter as Router,
  Routes,
  // Navigate,
  Route,
} from 'react-router-dom'



function App() {

  return (
    <>
      <PostsProvider>
        <AuthProvider>
          <Router>
            <NavBar/>
            <Routes>
              <Route path='/' element={<LoginWithGoogle />} />
              <Route path='/post' element={<Post />} />
              <Route path='/loginwithform' element={<LoginWithForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Router>
        </AuthProvider>
      </PostsProvider>
    </>
  )
}

export default App
