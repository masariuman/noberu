import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Setting from "./components/hbxcphyevn/Setting";
import Header from "./components/hbxcphyevn/Header";
import Sidebar from "./components/hbxcphyevn/Sidebar";
import Footer from "./components/hbxcphyevn/Footer";
import DashboardIndex from "./components/dashboard/Index";
import ChildIndex from "./components/child/Index";
import ParentIndex from "./components/parent/Index";
import ParentNew from "./components/parent/New";
import CategoryIndex from "./components/category/Index";
import CategoryEdit from "./components/category/Edit";
import TagIndex from "./components/tag/Index";
import TagEdit from "./components/tag/Edit";
import Empatkosongempat from "./components/Empatkosongempat";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <Header />
            <Setting />
            <div className="app-main">
                <Sidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>
                            <Route
                                exact
                                path="/admin"
                                component={DashboardIndex}
                            />
                            <Route
                                exact
                                path="/admin/child"
                                component={ChildIndex}
                            />
                            <Route
                                exact
                                path="/admin/parent"
                                component={ParentIndex}
                            />
                            <Route
                                exact
                                path="/admin/parent/new"
                                component={ParentNew}
                            />
                            <Route
                                exact
                                path="/admin/genre"
                                component={CategoryIndex}
                            />
                            <Route
                                exact
                                path="/admin/genre/:url/edit"
                                component={CategoryEdit}
                            />
                            <Route
                                exact
                                path="/admin/tag"
                                component={TagIndex}
                            />
                            <Route
                                exact
                                path="/admin/tag/:url/edit"
                                component={TagEdit}
                            />
                            <Empatkosongempat />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>,

        document.getElementById("root")
    );
}
