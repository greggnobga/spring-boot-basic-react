/** Vendor. */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Hooks. */
import useValidate from '$hooks/use-validate';
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { employeeListRequest } from '$store/feature/employee/list-slice';
import { employeeCreateRequest } from '$store/feature/employee/create-slice';
import { employeeUpdateRequest } from '$store/feature/employee/update-slice';
import { employeeDeleteRequest } from '$store/feature/employee/delete-slice';

import { departmentListRequest } from '$store/feature/department/list-slice';

const Employee = () => {
    /** Use state. */
    const [department_id, setDepartmentID] = useState('');

    /** Use selector. */
    const departmentList = useAppSelector((state) => state.departmentList);
    const { departments } = departmentList;

    /** Use effect. */
    useEffect(() => {
        /** Get all departments. */
        if (departments.length === 0) {
            dispatch(departmentListRequest());
        }
    }, [departments]);

    /** Use location. */
    const location = useLocation();
    const { id, fName, lName, eAddress, dId, action } = location.state || {};

    /** Map html element to validate hook. */
    const {
        value: firstName,
        hasError: firstNameHasError,
        isValid: firstNameIsValid,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        resetHandler: firstNameInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    const {
        value: lastName,
        hasError: lastNameHasError,
        isValid: lastNameIsValid,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetHandler: lastNameInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));

    /** Change class logic if valid or otherwise. */
    const firstNameInputClasses = firstNameHasError ? 'pt-2 font-thin text-red-400' : '';
    const lastNameInputClasses = lastNameHasError ? 'pt-2 font-thin text-red-400' : '';
    const emailInputClasses = emailHasError ? 'pt-2 font-thin text-red-400' : '';

    /** Set overall form validity. */
    let formIsValid = false;
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use navigate. */
    const navigator = useNavigate();

    /** Submit handler. */
    const submitHandler = async (event: any) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        firstNameBlurHandler();
        lastNameBlurHandler();
        emailBlurHandler();

        /** Check if there is invalid input. */
        if (!firstNameIsValid && !lastNameIsValid && !emailIsValid) {
            return;
        }

        /** Dispatch action. */
        if (action === 'update') {
            await dispatch(employeeUpdateRequest({ id, firstName, lastName, email, department_id }));
        } else {
            await dispatch(employeeCreateRequest({ firstName, lastName, email, department_id }));
        }

        /** Reset input. */
        firstNameInputReset();
        lastNameInputReset();
        emailInputReset();
        setDepartmentID('Select Department');

        /** Update list. */
        await dispatch(employeeListRequest());

        /** Send to list of employees. */
        navigator('/employees');
    };

    /** Delete handler. */
    const deleteHandler = async () => {
        await dispatch(employeeDeleteRequest({ id }));

        /** Update list. */
        await dispatch(employeeListRequest());

        /** Send to list of employees. */
        navigator('/employees');
    };

    /** Cancel handler. */
    const cancelHandler = async () => {
        /** Update list. */
        await dispatch(employeeListRequest());

        /** Back to list of employees. */
        navigator('/employees');
    };

    /** Return something. */
    return (
        <>
            {action === 'delete' ? (
                <div className='container mx-auto bg-rose-50 border border-rose-100 px-4 py-2'>
                    <div className='flex flex-wrap flex-col items-center justify-center'>
                        <p className='pt-6'>Are your sure you want to delete {fName + ' ' + lName}</p>
                        <div className='mt-6 flex items-center justify-center gap-x-6'>
                            <button type='button' className='text-sm font-semibold leading-6 text-gray-900' onClick={cancelHandler}>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='rounded-md bg-rose-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600'
                                onClick={() => deleteHandler()}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container mx-auto bg-rose-50 border border-rose-100 px-4 py-2'>
                    <h1 className='p-2 text-center font-bold text-2xl uppercase'>{action} Employee</h1>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='col-span-full'>
                            <label htmlFor='firstname' className='block text-sm font-medium leading-6 text-gray-900'>
                                First Name
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        firstNameHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='firstName'
                                    name='firstName'
                                    type='firstName'
                                    value={firstName ? firstName : fName}
                                    onChange={firstNameChangeHandler}
                                    onBlur={firstNameBlurHandler}
                                    autoComplete='off'
                                />
                                {firstNameHasError && <p className={`${firstNameInputClasses}`}>Please enter a valid first name.</p>}
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label htmlFor='lastname' className='block text-sm font-medium leading-6 text-gray-900'>
                                Last Name
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        lastNameHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='lastName'
                                    name='lastName'
                                    type='lastName'
                                    value={lastName ? lastName : lName}
                                    onChange={lastNameChangeHandler}
                                    onBlur={lastNameBlurHandler}
                                    autoComplete='off'
                                />
                                {lastNameHasError && <p className={`${lastNameInputClasses}`}>Please enter a valid last name.</p>}
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                Email
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        emailHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={email ? email : eAddress}
                                    onChange={emailChangeHandler}
                                    onBlur={emailBlurHandler}
                                    autoComplete='off'
                                />
                                {emailHasError && <p className={`${emailInputClasses}`}>Please enter a valid email.</p>}
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label htmlFor='departments' className='block text-sm font-medium leading-6 text-gray-900 pb-2'>
                                Select Department
                            </label>
                            <select
                                id='departments'
                                name='departments'
                                className='form-select appearance-none bg-no-repeat block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 bg-white'
                                value={department_id ? department_id : dId}
                                onChange={(e) => setDepartmentID(e.target.value)}>
                                <option value='Select Department'>Select Department</option>
                                {departments &&
                                    departments.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.departmentName}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>

                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <button type='button' className='text-sm font-semibold leading-6 text-gray-900' onClick={cancelHandler}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='rounded-md bg-rose-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:bg-slate-50 disabled:text-slate-400'
                            disabled={!formIsValid}
                            onClick={() => submitHandler(event)}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Employee;
