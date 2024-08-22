import React from 'react';

const Employees = () => {
    const employees = [
        { id: 1, firsName: 'Reijo', lastName: 'N', email: 'reijo@buntod.com' },
        { id: 2, firsName: 'Gregg', lastName: 'N', email: 'gregg@buntod.com' },
        { id: 3, firsName: 'Grigor', lastName: 'N', email: 'grigor@buntod.com' },
        { id: 4, firsName: 'Orion', lastName: 'N', email: 'orion@buntod.com' },
    ];
    return (
        <div class='relative overflow-x-auto'>
            <button className='bg-sky-500 p-2 my-4 shadow-md text-slate-50 rounded hover:bg-sky-600 hover:scale-95'>Add Employee </button>
            <table class='w-full text-sm text-left rtl:text-right text-gray-800 shadow-md'>
                <thead class='text-xs text-slate-50 uppercase bg-rose-500'>
                    <tr>
                        <th scope='col' class='px-6 py-3'>
                            ID
                        </th>
                        <th scope='col' class='px-6 py-3'>
                            First Name
                        </th>
                        <th scope='col' class='px-6 py-3'>
                            Last Name
                        </th>
                        <th scope='col' class='px-6 py-3'>
                            Email Address
                        </th>
                        <th scope='col' class='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees &&
                        employees.map((employee) => {
                            return (
                                <tr key={employee.id} class='odd:bg-rose-50  even:bg-rose-100'>
                                    <td class='px-6 py-4'>{employee.id}</td>
                                    <td class='px-6 py-4'>{employee.firsName}</td>
                                    <td class='px-6 py-4'>{employee.lastName}</td>
                                    <td class='px-6 py-4'>{employee.email}</td>
                                    <td class='px-6 py-4'>Delete</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
