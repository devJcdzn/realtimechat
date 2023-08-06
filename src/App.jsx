import './App.css';
import './style.scss';

import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
