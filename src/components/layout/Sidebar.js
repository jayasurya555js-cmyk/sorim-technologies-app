import React from 'react';
import Icon from '../ui/Icon';

const navigation = [
    { label: 'Dashboard', iconFile: 'Dash board.svg' },
    { label: 'User Management', iconFile: 'User Management.svg' },
    { label: 'Student Information', iconFile: 'Student Information.svg' },
    { label: 'Academics', iconFile: 'Academics.svg' },
    { label: 'Front Office', iconFile: 'Front Office.svg' },
    { label: 'Communication', iconFile: 'Communication.svg' },
];

function Sidebar({ open, onClose }) {
    return (
        <>
            {open && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={onClose} />}
            <aside className={`sidebar${open ? ' sidebar-open' : ''}`}>
                <div className="profile">
                    <div className="avatar-wrap"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85" alt="Mani, school administrator" /></div>
                    <strong>Mani</strong><span>Admin</span>
                </div>
                <nav className="side-nav" aria-label="Main navigation">
                    {navigation.map((item) => (
                        <button
                            key={item.label}
                            className={`nav-item${item.label === 'Dashboard' ? ' active' : ''}`}
                            disabled={item.label !== 'Dashboard'}
                            onClick={onClose}
                        >
                            <img className="nav-icon" src={`${process.env.PUBLIC_URL}/Assets/side%20nav%20icon/${encodeURIComponent(item.iconFile)}`} alt="" aria-hidden="true" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <button className="nav-item logout" disabled><Icon name="logout" size={17} /><span>Log Out</span></button>
            </aside>
        </>
    );
}

export default Sidebar;