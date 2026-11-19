import React from 'react';

function Icon({ name, size = 18 }) {
    const paths = {
        logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
        menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
        back: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
        check: <path d="m5 12 4 4L19 6" />,
        plus: <><path d="M12 5v14M5 12h14" /></>,
        edit: <><path d="m16 4 4 4L9 19l-5 1 1-5L16 4Z" /><path d="m14 6 4 4" /></>,
        delete: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m5 4v6m4-6v6" /></>,
        bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
        close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    };

    return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default Icon;