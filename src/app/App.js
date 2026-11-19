import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import DashboardOverview from '../features/dashboard/DashboardOverview';
import UserManagement from '../features/users/UserManagement';
import students from '../features/users/data/students';
import '../App.css';

function App() {
    const [navOpen, setNavOpen] = useState(false);
    const [users, setUsers] = useState(students);

    return (
        <div className="app-shell">
            <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
            <div className="main-column">
                <Header onMenuClick={() => setNavOpen(true)} />
                <main className="dashboard-main">
                    <DashboardOverview users={users} />
                    <UserManagement users={users} onUsersChange={setUsers} />
                </main>
            </div>
        </div>
    );
}

export default App;