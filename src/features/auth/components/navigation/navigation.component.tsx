// external
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// internal
import { AppState } from '../../../../app';
import { AuthState } from '../../types';

export const NavigationComponent = () => {
    const user = useSelector<AppState, PropType<AuthState, "user">>(state => state.auth.user);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">Carousel</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">About</Link>
                                </li>
                                {user ?
                                    (<li className="nav-item">
                                        <Link to="/profile" className="nav-link">{user.username}</Link>
                                    </li>) :
                                    (<li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};