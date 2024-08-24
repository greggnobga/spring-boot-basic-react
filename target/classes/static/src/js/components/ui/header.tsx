/** Vendor. */
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='container mx-auto p-4'>
            <nav class='flex flex-wrap align-middle justify-between'>
                <div>
                    <Link to='/'>Employee Managment System</Link>
                </div>
                <div>
                    <Link to='/list-employee'>Employee List</Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;
