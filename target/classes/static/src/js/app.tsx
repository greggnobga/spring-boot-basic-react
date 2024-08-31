/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Components. */
import Layout from '$components/ui/layout';
import Scroll from '$components/ui/scroll';

import Home from '$components/home';

import Employees from '$components/employee/employees';
import Employee from '$components/employee/employee';

import Departments from '$components/departments/departments';
import Department from '$components/departments/department';

/** Main. */
const App = () => {
    /** Return something. */
    return (
        <Router>
            <Scroll>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                    </Route>

                    <Route path='/' element={<Layout />}>
                        <Route path='/employees' element={<Employees />} />
                        <Route path='/create-employee' element={<Employee />} />
                        <Route path='/update-employee' element={<Employee />} />
                        <Route path='/delete-employee' element={<Employee />} />
                    </Route>

                    <Route path='/' element={<Layout />}>
                        <Route path='/departments' element={<Departments />} />
                        <Route path='/create-department' element={<Department />} />
                        <Route path='/update-department' element={<Department />} />
                        <Route path='/delete-department' element={<Department />} />
                    </Route>
                </Routes>
            </Scroll>
        </Router>
    );
};

export default App;
