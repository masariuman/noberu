import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Header from "./components/hbxcphyevn/Header";
import Sidebar from "./components/hbxcphyevn/Sidebar";
import Footer from "./components/hbxcphyevn/Footer";
import DashboardIndex from "./components/dashboard/Index";
import Child from "./components/child/Index";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <Header />
            <div className="app-main">
                <Sidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel"
                                component={DashboardIndex}
                            />
                            <Route
                                exact
                                path="/nanael_masariuman_hachiel/menu2"
                                component={Menu2}
                            />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>,

        document.getElementById("root")
    );
}
