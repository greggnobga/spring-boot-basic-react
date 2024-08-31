/** Vendor. */
import { useNavigate, useLocation } from 'react-router-dom';

/** Hooks. */
import useValidate from '$hooks/use-validate';
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { departmentListRequest } from '$store/feature/department/list-slice';
import { departmentCreateRequest } from '$store/feature/department/create-slice';
import { departmentUpdateRequest } from '$store/feature/department/update-slice';
import { departmentDeleteRequest } from '$store/feature/department/delete-slice';

const Department = () => {
    /** Use location. */
    const location = useLocation();
    const { id, name, description, action } = location.state || {};

    /** Map html element to validate hook. */
    const {
        value: departmentName,
        hasError: departmentNameHasError,
        isValid: departmentNameIsValid,
        valueChangeHandler: departmentNameChangeHandler,
        inputBlurHandler: departmentNameBlurHandler,
        resetHandler: departmentNameInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+.]*$/));

    const {
        value: departmentDescription,
        hasError: departmentDescriptionHasError,
        isValid: departmentDescriptionIsValid,
        valueChangeHandler: departmentDescriptionChangeHandler,
        inputBlurHandler: departmentDescriptionBlurHandler,
        resetHandler: departmentDescriptionInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+.]*$/));

    /** Change class logic if valid or otherwise. */
    const departmentNameInputClasses = departmentNameHasError ? 'pt-2 font-thin text-red-400' : '';
    const departmentDescriptionInputClasses = departmentDescriptionHasError ? 'pt-2 font-thin text-red-400' : '';

    /** Set overall form validity. */
    let formIsValid = false;
    if (departmentNameIsValid && departmentDescriptionIsValid) {
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
        departmentNameBlurHandler();
        departmentDescriptionBlurHandler();

        /** Check if there is invalid input. */
        if (!departmentNameIsValid && !departmentDescriptionIsValid) {
            return;
        }

        /** Dispatch action. */
        if (action === 'update') {
            await dispatch(departmentUpdateRequest({ id, departmentName, departmentDescription }));
        } else {
            await dispatch(departmentCreateRequest({ departmentName, departmentDescription }));
        }

        /** Reset input. */
        departmentNameInputReset();
        departmentDescriptionInputReset();

        /** Update list. */
        await dispatch(departmentListRequest());

        /** Send to list of departments. */
        navigator('/departments');
    };

    /** Delete handler. */
    const deleteHandler = async () => {
        await dispatch(departmentDeleteRequest({ id }));

        /** Update list. */
        await dispatch(departmentListRequest());

        /** Send to list of employees. */
        navigator('/departments');
    };

    /** Cancel handler. */
    const cancelHandler = async () => {
        /** Update list. */
        await dispatch(departmentListRequest());

        /** Back to list of departments. */
        navigator('/departments');
    };

    /** Return something. */
    return (
        <>
            {action === 'delete' ? (
                <div className='container mx-auto bg-rose-50 border border-rose-100 px-4 py-2'>
                    <div className='flex flex-wrap flex-col items-center justify-center'>
                        <p className='pt-6'>Are your sure you want to delete {name}</p>
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
                    <h1 className='p-2 text-center font-bold text-2xl uppercase'>{action} Department</h1>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='col-span-full'>
                            <label htmlFor='departmentname' className='block text-sm font-medium leading-6 text-gray-900'>
                                Department Name
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        departmentNameHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='departmentName'
                                    name='departmentName'
                                    type='departmentName'
                                    value={departmentName ? departmentName : name}
                                    onChange={departmentNameChangeHandler}
                                    onBlur={departmentNameBlurHandler}
                                    autoComplete='off'
                                />
                                {departmentNameHasError && <p className={`${departmentNameInputClasses}`}>Please enter a valid department name.</p>}
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label htmlFor='lastname' className='block text-sm font-medium leading-6 text-gray-900'>
                                Department Description
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        departmentDescriptionHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='departmentDescription'
                                    name='departmentDescription'
                                    type='departmentDescription'
                                    value={departmentDescription ? departmentDescription : description}
                                    onChange={departmentDescriptionChangeHandler}
                                    onBlur={departmentDescriptionBlurHandler}
                                    autoComplete='off'
                                />
                                {departmentDescriptionHasError && (
                                    <p className={`${departmentDescriptionInputClasses}`}>Please enter a valid department description.</p>
                                )}
                            </div>
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
                            onClick={submitHandler}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Department;
