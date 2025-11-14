import React, { useState } from 'react';
import "./Homepage.css";
import cloudLogo from "./cloud.svg";
import pfp from "./pfp.svg";

function Homepage() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header>
                <div>
                    <div className="cloudLogo">
                        <img src={cloudLogo} alt="logo"/>
                    </div>
                    <h1>Cloud Storage</h1>
                </div>

                <div className="header-right">

                    {menuOpen && (
                        <div className="dropdown-menu">
                            <p>Upgrade</p>
                            <p>Settings</p>
                        </div>
                    )}

                    <div
                        className="pfp"
                        onClick={() => setMenuOpen(prev => !prev)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={pfp} alt="pfp" />
                    </div>
                </div>
            </header>

            <main>
                <section className="navbar">
                    <nav>
                        <div>
                            <li>home</li>
                            <li>Recent</li>
                            <li>Favorites</li>
                            <li>Trash</li>
                        </div>

                        <div>
                            Storage
                            <br />
                            balken
                        </div>
                    </nav>
                </section>

                <section className="main">
                    <div className="search">
                        <input type="search" placeholder="Search" />
                    </div>
                    <div className="upload">
                        <button>upload</button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Homepage;