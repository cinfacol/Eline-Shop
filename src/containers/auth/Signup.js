import Layout from "../../hocs/Layout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "../../features/auth/authSlice";
import { clearMessage } from "../../features/message/messageSlice";
import { Oval } from 'react-loader-spinner'

const Signup = ({ loading }) => {
  const [accountCreated, setAccountCreated] = useState(false);

  const { message } = useSelector((state) => state.message);
  
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .test(
        "len",
        "The first_name must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    last_name: Yup.string()
      .test(
        "len",
        "The last_name must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
    re_password: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSignup = (formValue) => {
    const {
      first_name,
      last_name,
      email,
      password,
      re_password
    } = formValue;

    setAccountCreated(false);

    dispatch(signup({ first_name, last_name, email, password, re_password }))
      .unwrap()
      .then(() => {
        setAccountCreated(true);
      })
      .catch(() => {
        setAccountCreated(false);
      });
  };

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg className="mx-auto w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrarse</h2>
          </div>
        </div>


        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              <Form>
                {!accountCreated && (
                  <div>
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <div className="mt-1">
                        <Field
                          name="first_name"
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Ingrese su nombre"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Apellido
                      </label>
                      <div className="mt-1">
                        <Field
                          name="last_name"
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Ingrese su nombre"
                        />
                        <ErrorMessage
                          name="last_name"
                          component="div"
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <Field
                          name="email"
                          type="email"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Ingrese su Correo Electrónico"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                      </label>
                      <div className="mt-1">
                        <Field
                          name="password"
                          type="password"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Ingrese su Contraseña"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="re_password" className="block text-sm font-medium text-gray-700">
                        Confirmar Contraseña
                      </label>
                      <div className="mt-1">
                        <Field
                          name="re_password"
                          type="password"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Confirme su contraseña"
                        />
                        <ErrorMessage
                          name="re_password"
                          component="div"
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      {(loading === 'pending') ?
                        <button
                          className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Oval
                            color="#fff"
                            width={20}
                            height={20}
                          />
                        </button> :
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Sign Up
                        </button>
                      }

                    </div>
                  </div>
                )}
              </Form>
            </Formik>
            {(message || accountCreated) && (
              <div className="flex w-full justify-center shadow-sm rounded-md mt-4">
                <div
                  className={accountCreated ? "bg-green-600 py-4 px-6 rounded-md flex items-center" : "bg-red-600 py-4 px-6 rounded-md flex items-center"}
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup