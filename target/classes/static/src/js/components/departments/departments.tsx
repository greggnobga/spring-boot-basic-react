/** Vendor. */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hooks. */
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { departmentListRequest } from '$store/feature/department/list-slice';

const DepartmentList = () => {
    /** Use selector. */
    const departmentList = useAppSelector((state) => state.departmentList);
    const { departments } = departmentList;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use navigate. */
    const navigator = useNavigate();

    /** Use effect. */
    useEffect(() => {
        /** Fetch department on load. */
        dispatch(departmentListRequest());
    }, []);

    /** Create department handler. */
    const createDepartmentHandler = () => {
        /** Navigate out. */
        navigator('/create-department', { state: { action: 'create' } });
    };

    /** Update department handler. */
    const updateDepartmentHandler = (id: number) => {
        /** Get employee details. */
        const details = departments.filter((department) => department.id === id);

        /** Navigate out. */
        navigator('/update-department', {
            state: { id, name: details[0].departmentName, description: details[0].departmentDescription, action: 'update' },
        });
    };

    /** Delete department handler. */
    const deleteDepartmentHandler = (id: number) => {
        /** Get employee details. */
        const details = departments.filter((department) => department.id === id);

        /** Navigate out. */
        navigator('/delete-department', {
            state: { id, name: details[0].departmentName, action: 'delete' },
        });
    };

    /** Return something. */
    return (
        <div className='relative overflow-x-auto'>
            <h1 className='text-slate-700 text-center font-bold text-3xl uppercase'>List Of Departments</h1>
            <button
                className='bg-sky-500 py-2 px-4 my-4 shadow-md text-slate-50 rounded hover:bg-sky-600 hover:scale-95'
                onClick={() => createDepartmentHandler()}>
                Create Department
            </button>
            <table className='w-full text-sm text-left rtl:text-right text-gray-800 shadow-md'>
                <thead className='text-xs text-slate-50 uppercase bg-rose-500'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            ID
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Department Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Department Description
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {departments ? (
                        departments.map((department) => {
                            return (
                                <tr key={department.id} className='odd:bg-rose-50  even:bg-rose-100'>
                                    <td className='px-6 py-4'>{department.id}</td>
                                    <td className='px-6 py-4'>{department.departmentName}</td>
                                    <td className='px-6 py-4'>{department.departmentDescription}</td>
                                    <td className='px-6 py-4'>
                                        <button
                                            className='p-2 mx-2 pointer bg-sky-600 text-white rounded hover:bg-sky-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => updateDepartmentHandler(department.id)}>
                                            Update
                                        </button>
                                        <button
                                            className='p-2 mx-2 pointer bg-rose-600 text-white rounded hover:bg-rose-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => deleteDepartmentHandler(department.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <p className='p-2'>No department added yet.</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentList;
