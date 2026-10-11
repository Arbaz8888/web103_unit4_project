import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <header className='topbar'>
            <nav className='topbar-inner'>
                <NavLink to='/' className='brand'>
                    <span className='brand-mark' aria-hidden='true'>⌨️</span>
                    <span className='brand-name'>ClackLab</span>
                </NavLink>

                <div className='topbar-links'>
                    <NavLink to='/' end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                        Customize
                    </NavLink>
                    <NavLink to='/keyboards' className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                        My Keyboards
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Navigation
