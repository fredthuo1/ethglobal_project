import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/AboutPage';
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';
import AddMaintenancePage from './pages/AddMaintenancePage.js';
import CarDetails from './pages/CarDetailsPage.js';
import CarListPage from './pages/CarListPage.js';
import EditMaintenancePage from './pages/EditMaintenancePage.js';
import MaintenanceRecordPage from './pages/MaintenanceRecordsPage.js';
import SettingsPage from './pages/SettingsPage.js';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/add-maintenance" element={<AddMaintenancePage />} />
                <Route path="/cardetails/:carId" element={<CarDetails />} />
                <Route path="/carlist" element={<CarListPage />} />
                <Route path="/editmaintenance/:carId/:maintenanceId" element={<EditMaintenancePage />} />
                <Route path="/maintenancerecord/:carId/:maintenanceId" element={<MaintenanceRecordPage />} />
                <Route path="/settings" element={<SettingsPage />} /> 
                {/* Add more routes here */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
