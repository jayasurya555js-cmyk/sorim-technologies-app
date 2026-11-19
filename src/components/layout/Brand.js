import React from 'react';

function Brand() {
    return (
        <div className="brand">
            <img className="brand-logo" src={`${process.env.PUBLIC_URL}/Assets/logo.svg`} alt="Schana" />
        </div>
    );
}

export default Brand;