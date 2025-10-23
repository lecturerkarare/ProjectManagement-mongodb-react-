import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ILogin, userLogin } from '../../redux/feature/auth/authActions';

interface RootState {
  auth: {
    loading: boolean;
    userInfo: any;
    error: any;
    success: boolean;
  };
}
const Login: React.FC<{}> = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const initialValues: ILogin = {
    email: '',
    password: ''
  };
  let navigate = useNavigate();

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);


  
  return (
    <div className="container mx-auto px-4 items-center md:flex-row md:items-start flex flex-col mt-28  ">
      <div className="w-full justify-center items-center mt-4 md:w-1/2 md:order-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const resultAction = await dispatch(userLogin(values) as any);

              if (userLogin.fulfilled.match(resultAction)) {
                setAlertMessage({ type: 'success', message: 'You have successfully logged in. Please wait for redirection' });
                resetForm();
                setTimeout(()=>{
                  navigate('/app'); 

                },2000)
              } else {
                const errorMessage = resultAction.payload || 'Login failed. Please try again.';
                setAlertMessage({ type: 'error', message: errorMessage });
              }
            } catch (error) {
              setAlertMessage({ type: 'error', message: 'Unexpected error occurred.' });
            } finally {
              setSubmitting(false);
            }
          }}>
          {({ isSubmitting, errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-12 pt-2 pb-8">
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

              <h4 className=" text-center font-bold text-lg">Login</h4>
              <div className="">
                <div className="mb-4 w-full  ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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

                <p className="text-right"> Forgot Password ?</p>

                <button
                  className=" bg-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  type="submit"
                  disabled={isSubmitting}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full justify-center items-center mt-4 md:w-1/2 md:order-1">
        <div className="bg-blue-500 shadow-md rounded px-12 text-white pb-16 mb-4">
          <div className="p-2">
            <h4 className="text-xl font-bold">Welcome to the Project Management System</h4>
            <p className="mt-4">
              Empower your development team by streamlining project planning, assignment, and
              tracking. Our system enables managers to assign projects to developers, set timelines,
              and monitor progress from a centralized dashboard.
            </p>
            <p className="mt-4">
              Developers can easily view their assigned tasks, update statuses, and collaborate with
              teammates for faster delivery and improved productivity.
            </p>
            <div className="flex flex-row mt-4 space-x-4">
              <div>
                <p>Don't have an account?</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    window.location.href = '/auth/signup';
                  }}
                  className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-gray-200">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
