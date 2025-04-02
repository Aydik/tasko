import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {TaskPage} from "./pages/TaskPage";
import {MainLayout} from "./components/layouts/MainLayout";

import './index.module.scss'


function App(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<></>}/>
                <Route element={<MainLayout/>}>
                    <Route path="/tasks" element={<TaskPage/>}/>
                    {/*<Route path="/teams" element={<Teams/>}/>*/}
                </Route>
            </Routes>
        </Router>
    )
}

export default App
