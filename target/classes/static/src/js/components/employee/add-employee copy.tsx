/** Vendor. */
import { useNavigate } from 'react-router-dom';

/** Hooks. */
import useValidate from '$hooks/use-validate';
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { employeeAddRequest } from '$store/feature/employee/add-slice';

const Employee = () => {
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
        if (!firstNameIsValid && !firstNameIsValid && !emailIsValid) {
            return;
        }

        /** Dispatch action. */
        dispatch(employeeAddRequest({ firstName, lastName, email }));

        /** Reset input. */
        firstNameInputReset();
        lastNameInputReset();
        emailInputReset();

        /** Send to list of employees. */
        navigator('/employees');
    };

    /** Return something. */
    return (
        <div className='container mx-auto bg-rose-50 border border-rose-100 px-4 py-2'>
            <h1 className='p-2 text-center font-bold text-2xl'>Add Employee</h1>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='col-span-full'>
                    <label htmlFor='firstname' className='block text-sm font-medium leading-6 text-gray-900'>
                        First Name
                    </label>
                    <div className='mt-2'>
                        <input
                            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 form-input ${
                                firstNameHasError ? 'border border-red-500' : ''
                            }`}
                            id='firstName'
                            name='firstName'
                            type='firstName'
                            value={firstName}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            autoComplete='off'
                        />
                        {firstNameHasError && <p className={`form-alert ${firstNameInputClasses}`}>Please enter a valid first name.</p>}
                    </div>
                </div>

                <div className='col-span-full'>
                    <label htmlFor='lastname' className='block text-sm font-medium leading-6 text-gray-900'>
                        Last Name
                    </label>
                    <div className='mt-2'>
                        <input
                            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 form-input ${
                                lastNameHasError ? 'border border-red-500' : ''
                            }`}
                            id='lastName'
                            name='lastName'
                            type='lastName'
                            value={lastName}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}
                            autoComplete='off'
                        />
                        {lastNameHasError && <p className={`form-alert ${lastNameInputClasses}`}>Please enter a valid last name.</p>}
                    </div>
                </div>

                <div className='col-span-full'>
                    <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                        Email
                    </label>
                    <div className='mt-2'>
                        <input
                            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 form-input ${
                                emailHasError ? 'border border-red-500' : ''
                            }`}
                            id='email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            autoComplete='off'
                        />
                        {emailHasError && <p className={`form-alert ${emailInputClasses}`}>Please enter a valid email.</p>}
                    </div>
                </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
                <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
                    Cancel
                </button>
                <button
                    type='submit'
                    className='rounded-md bg-rose-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600'
                    onClick={submitHandler}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Employee;
