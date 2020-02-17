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
import CategoryIndex from "./components/category/Index";
import TagIndex from "./components/tag/Index";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <Header />
            <Switch>
                <Setting />
                <div className="app-main">
                    <Sidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel"
                                component={DashboardIndex}
                            />
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel/child"
                                component={ChildIndex}
                            />
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel/parent"
                                component={ParentIndex}
                            />
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel/category"
                                component={CategoryIndex}
                            />
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel/tag"
                                component={TagIndex}
                            />
                        </div>
                        <Footer />
                    </div>
                </div>
                <Empatkosongempat />
            </Switch>
        </BrowserRouter>,

        document.getElementById("root")
    );
}
