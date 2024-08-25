/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Components. */
import Layout from '$components/ui/layout';
import Scroll from '$components/ui/scroll';
import Home from '$components/home';
import Employees from '$components/employee/employees';
import Employee from '$components/employee/employee';

/** Main. */
const App = () => {
    /** Return something. */
    return (
        <Router>
            <Scroll>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/employees' element={<Employees />} />
                        <Route path='/add-employee' element={<Employee />} />
                        <Route path='/update-employee' element={<Employee />} />
                    </Route>
                </Routes>
            </Scroll>
        </Router>
    );
};

export default App;
