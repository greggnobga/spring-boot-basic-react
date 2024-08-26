/** Vendor. */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hooks. */
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { employeeListRequest } from '$store/feature/employee/list-slice';

const EmployeeList = () => {
    /** Use selector. */
    const employeeList = useAppSelector((state) => state.employeeList);
    const { employees } = employeeList;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** Fetch employee on load. */
        dispatch(employeeListRequest());
    }, []);

    /** Use navigate. */
    const navigator = useNavigate();

    /** Add employee handler. */
    const addEmployeeHandler = () => {
        /** Navigate out. */
        navigator('/add-employee', { state: { action: 'add' } });
    };

    /** Delete employee handler. */
    const deleteEmployeeHandler = (id: number) => {
        /** Get employee details. */
        const details = employees.filter((employee) => employee.id === id);

        /** Navigate out. */
        navigator('/delete-employee', {
            state: { id, fName: details[0].firstName, lName: details[0].lastName, eAddress: details[0].email, action: 'delete' },
        });
    };

    /** Update employee handler. */
    const updateEmployeeHandler = (id: number) => {
        /** Get employee details. */
        const details = employees.filter((employee) => employee.id === id);

        /** Navigate out. */
        navigator('/update-employee', {
            state: { id, fName: details[0].firstName, lName: details[0].lastName, eAddress: details[0].email, action: 'update' },
        });
    };

    /** Return something. */
    return (
        <div className='relative overflow-x-auto'>
            <h1 className='text-slate-700 text-center font-bold text-3xl uppercase'>List Of Employees</h1>
            <button
                className='bg-sky-500 py-2 px-4 my-4 shadow-md text-slate-50 rounded hover:bg-sky-600 hover:scale-95'
                onClick={addEmployeeHandler}>
                Add Employee
            </button>
            <table className='w-full text-sm text-left rtl:text-right text-gray-800 shadow-md'>
                <thead className='text-xs text-slate-50 uppercase bg-rose-500'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            ID
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            First Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Last Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Email Address
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees ? (
                        employees.map((employee) => {
                            return (
                                <tr key={employee.id} className='odd:bg-rose-50  even:bg-rose-100'>
                                    <td className='px-6 py-4'>{employee.id}</td>
                                    <td className='px-6 py-4'>{employee.firstName}</td>
                                    <td className='px-6 py-4'>{employee.lastName}</td>
                                    <td className='px-6 py-4'>{employee.email}</td>
                                    <td className='px-6 py-4'>
                                        <button
                                            className='p-2 mx-2 pointer bg-sky-600 text-white rounded hover:bg-sky-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => updateEmployeeHandler(employee.id)}>
                                            Update
                                        </button>
                                        <button
                                            className='p-2 mx-2 pointer bg-rose-600 text-white rounded hover:bg-rose-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => deleteEmployeeHandler(employee.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <p className='p-2'>No employee added yet.</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
