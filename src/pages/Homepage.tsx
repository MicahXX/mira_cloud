import React from 'react';
import logo from './logo.svg';
import * as domain from "node:domain";
import "./Homepage.css";

function Homepage() {
  return (
      <body>
          <header>
                <div>
                        (so Wolken logo)
                      <h1>
                          Cloud Storage
                      </h1>
                  </div>
                  <div>
                    <h2>
                        upgrade
                    </h2>
                    <h2>
                        settings
                    </h2>
                <div>

                  </div>
                      <div className={"pfp"}>
                          <img src="" alt="pfp"/>

                      </div>
              </div>
          </header>

          <main>
              <section className="navbar">
                  <nav>
                      <div>
                          <li>
                              home
                          </li>
                          <li>
                              Recent
                          </li>
                          <li>
                              Favorites
                          </li>
                          <li>
                              Trash
                          </li>
                      </div>

                      <div>
                          Storage
                          <br/>
                          balken
                      </div>
                  </nav>
              </section>

              <section className="main">
                  <div>
                      <input type="search" placeholder="Search"/>
                  </div>
                  <div>
                      <button>+ upload</button>
                  </div>
              </section>
          </main>
      </body>
  );
}

export default Homepage;