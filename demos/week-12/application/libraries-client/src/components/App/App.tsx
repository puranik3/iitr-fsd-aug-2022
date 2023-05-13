// rafce
// sfc
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Menu from '../Menu/Menu';

import HomePage from '../../pages/HomePage/HomePage';
import LibrariesListPage from '../../pages/LibrariesListPage/LibrariesListPage';
import LibraryDetailsPage from '../../pages/LibraryDetails/LibraryDetails';
import AboutPage from '../../pages/AboutPage/AboutPage';

import './App.css';

const App = () => {
    return (
        <>
            <Menu />
            <Container className="my-4">
                <Routes>
                    <Route path="/home" element={<HomePage />} /> 
                    <Route path="/libraries" element={<LibrariesListPage />} /> 
                    <Route path="/libraries/:id" element={<LibraryDetailsPage />} /> 
                    <Route path="/about" element={<AboutPage />} /> 
                </Routes>
            </Container>
        </>
    );
}
 
export default App;