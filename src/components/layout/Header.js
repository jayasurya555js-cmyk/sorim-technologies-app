import React, { useState } from 'react';
import Brand from './Brand';
import Icon from '../ui/Icon';

function Header({ onMenuClick }) {
    const [noticeOpen, setNoticeOpen] = useState(false);

    return (
        <header className="topbar">
            <button className="icon-button menu-button" aria-label="Open navigation" onClick={onMenuClick}><Icon name="menu" size={24} /></button>
            <Brand />
            <p className="welcome">Welcome, Mani !</p>
            <div className="notification-wrap">
                <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNoticeOpen(!noticeOpen)}><Icon name="bell" size={19} /><span /></button>
                {noticeOpen && <div className="notification-popover">You're all caught up.</div>}
            </div>
        </header>
    );
}

export default Header;