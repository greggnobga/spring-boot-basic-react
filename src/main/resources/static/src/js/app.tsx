/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Components. */
import Layout from '$components/ui/layout';
import Scroll from '$components/ui/scroll';
import Home from '$components/home';
import EmployeeList from '$components/employee/list-employee';
import EmployeeAdd from '$components/employee/add-employee';

/** Main. */
const App = () => {
    /** Return something. */
    return (
        <Router>
            <Scroll>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/list-employee' element={<EmployeeList />} />
                        <Route path='/add-employee' element={<EmployeeAdd />} />
                    </Route>
                </Routes>
            </Scroll>
        </Router>
    );
};

export default App;
