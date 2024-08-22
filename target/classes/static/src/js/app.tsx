/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Components. */
import Layout from '$components/ui/layout';
import Scroll from '$components/ui/scroll';
import Home from '$components/home';
import Employees from '$components/employees';

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
                    </Route>
                </Routes>
            </Scroll>
        </Router>
    );
};

export default App;
