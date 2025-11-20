import React, { useState, useEffect } from 'react';
import "./Homepage.css";
import cloudLogo from "./mira_cloud2.png";
import pfp from "./gast.png";

function Homepage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileImg, setProfileImg] = useState<string>(pfp);

    // Profilbild aus LocalStorage laden
    useEffect(() => {
        const savedImg = localStorage.getItem("profileImg");
        if (savedImg) {
            setProfileImg(savedImg);
        }
    }, []);

    // Profilbild ändern
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                const base64Image = reader.result;
                setProfileImg(base64Image);
                localStorage.setItem("profileImg", base64Image);
            }
        };

        reader.readAsDataURL(file);
    }

    return (
        <div className="layout">
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

                            <label style={{cursor: "pointer"}}>
                                Profilbild
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    )}

                    <div
                        className="pfp"
                        onClick={() => setMenuOpen(prev => !prev)}
                        style={{cursor: "pointer"}}
                    >
                        <img src={profileImg} alt="pfp"/>
                    </div>
                </div>
            </header>

            <aside className="sidebar">
                <ul className="menu">
                    <li className="menu-item active">Home</li>
                    <li className="menu-item">Recent</li>
                    <li className="menu-item">Favorites</li>
                    <li className="menu-item">Trash</li>
                </ul>

                <div className="storage-box">
                    <h4>Storage</h4>
                    <div className="storage-bar">
                        <div className="storage-fill"></div>
                    </div>
                    <p className="storage-info">0.0 GB of 10 GB used</p>
                </div>
            </aside>

            <main className="content">
                <div className="search-upload">
                    <div className="search">
                        <input type="search" placeholder="Search" />
                    </div>
                    <div className="upload">
                        <button>Upload</button>
                    </div>
                </div>

                {"Me testing things: "}
                <div className="file-grid">
                    <div className="file-card">
                        <div className="file-icon">test1</div>
                        <div className="file-name">Document1.pdf</div>
                    </div>
                    <div className="file-card">
                        <div className="file-icon">test2</div>
                        <div className="file-name">Notes.txt</div>
                    </div>
                    <div className="file-card">
                        <div className="file-icon">test3</div>
                        <div className="file-name">Image.png</div>
                    </div>
                </div>
            </main>

        </div>
    );
}

    export default Homepage;