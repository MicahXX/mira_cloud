import React, { useState, useEffect } from 'react';
import "./Homepage.css";
import cloudLogo from "./mira_cloud2.png";
import pfp from "./gast.png";
import { get, set } from "idb-keyval";

function Homepage() {
    const [profileImg, setProfileImg] = useState<string>(pfp);
    const [searchTerm, setSearchTerm] = useState("");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [upgradeOpen, setUpgradeOpen] = useState(false);

    const files = [
        { id: 1, name: "Anime" },
        { id: 2, name: "Kirito" },
        { id: 3, name: "W" }
    ];

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        get("profileImg").then((savedImg) => {
            if (savedImg) setProfileImg(savedImg);
        });
    }, []);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            if (typeof reader.result === "string") {
                const base64Image = reader.result;
                try {
                    await set("profileImg", base64Image);
                    setProfileImg(base64Image);
                } catch (err) {
                    console.error("IndexedDB error:", err);
                }
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

                {/* Header-right: hover opens menu */}
                <div className="header-right">
                    <div className="pfp-container">
                        <div className="pfp">
                            <img src={profileImg} alt="pfp" />
                        </div>

                        <div className="dropdown-menu">
                            <p onClick={() => setUpgradeOpen(true)}>Upgrade</p>
                            <p onClick={() => setSettingsOpen(true)}>Settings</p>

                            <label>
                                Profile
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    {upgradeOpen && (
                        <div className="popup">
                            <div className="popup-content">
                                <button className="close-btn" onClick={() => setUpgradeOpen(false)}>Close</button>
                            </div>
                        </div>
                    )}

                    {settingsOpen && (
                        <div className="popup">
                            <div className="popup-content">
                                <button className="close-btn" onClick={() => setSettingsOpen(false)}>Close</button>
                            </div>
                        </div>
                    )}
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
                    <p className="storage-info">6.7 GB of 10 GB used</p>
                </div>
            </aside>

            <main className="content">
                <div className="search-upload">
                    <div className="search">
                        <input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="upload">
                        <button>Upload</button>
                    </div>
                </div>

                <div className="file-grid">
                    {filteredFiles.map(file => (
                        <div className="file-card" key={file.id}>
                            <div className="file-icon">{file.name}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Homepage;