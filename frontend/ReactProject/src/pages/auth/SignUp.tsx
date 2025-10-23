import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ISignUp, registerUser } from '../../redux/feature/auth/authActions';

interface RootState {
  auth: {
    loading: boolean;
    userInfo: any;
    error: any;
    success: boolean;
  };
}
const SignUp: React.FC<{}> = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const initialValues: ISignUp = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }
  let navigate = useNavigate();
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="container mx-auto px-4 items-center md:flex-row md:items-start flex flex-col mt-28  ">
      <div className="w-full justify-center items-center mt-4 md:w-1/2 md:order-2 flex-grow">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const resultAction = await dispatch(registerUser(values) as any);

              if (registerUser.fulfilled.match(resultAction)) {
                setAlertMessage({ type: 'success', message: 'Registration successful!' });
                resetForm();
                navigate('/');
              } else {
                const errorMessage =
                  resultAction.payload || 'Registration failed. Please try again.';
                setAlertMessage({ type: 'error', message: errorMessage });
              }
            } catch (error) {
              setAlertMessage({ type: 'error', message: 'Unexpected error occurred.' });
            } finally {
              setSubmitting(false);
            }
          }}>
          {({ isSubmitting, errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-12 pt-4 pb-8 mb-4">
              {alertMessage && (
                <div
                  className={`mb-4 p-2 text-sm rounded ${
                    alertMessage.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                  {alertMessage.message}
                </div>
              )}
              <h4 className=" text-center font-bold text-lg">Sign Up</h4>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  text-start font-bold mb-2"
                  htmlFor="firstname">
                  First Name
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                />
                {errors.firstname && touched.firstname ? <div>{errors.firstname}</div> : null}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700  text-start text-sm font-bold mb-2"
                  htmlFor="lastname">
                  Last Name
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                />
                {errors.lastname && touched.lastname ? <div>{errors.lastname}</div> : null}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-start text-sm font-bold mb-2"
                  htmlFor="email">
                  Email
                </label>
                <Field
                  validate={validateEmail}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-start text-sm font-bold mb-2"
                  htmlFor="password">
                  Password
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
              </div>

              <button
                className=" bg-blue-500 shadow appearance-none border rounded  w-full  justify-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="submit"
                disabled={isSubmitting}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full justify-center items-center mt-4 md:w-1/2 md:order-1">
        <div className="bg-blue-500 shadow-md rounded px-12 text-white pb-16 mb-4">
          <div className="p-16 flex-grow">
            <h4 className="text-xl font-bold">Welcome to the Best Project Assignment System</h4>
            <p className="mt-4">
              Efficient project management is essential for delivering high-quality work on time.
              Whether you're managing a small team or a large-scale development effort, our system
              helps you plan, assign, and monitor projects with ease.
            </p>
            <p className="mt-4">
              Assign tasks to developers, set clear deadlines, track project progress in real time,
              and ensure accountability through transparent workflows—all in one place.
            </p>
            <div className="flex flex-row mt-4 space-x-4">
              <div>
                <p>Already have an account?</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    window.location.href = '/auth/login';
                  }}
                  className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-gray-200">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
