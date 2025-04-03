import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {TaskPage} from "./pages/TaskPage";
import {MainLayout} from "./components/layouts/MainLayout";

import './index.module.scss'
import {TeamPage} from "./pages/TeamPage";
import {DashboardPage} from "./pages/DashboardPage";


function App(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<></>}/>
                <Route element={<MainLayout/>}>
                    <Route path="/tasks" element={<TaskPage/>}/>
                    <Route path="/teams" element={<TeamPage/>}/>
                    <Route path="/dashboards" element={<DashboardPage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
