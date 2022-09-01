import Layout from '../../hocs/Layout';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { activate } from '../../features/auth/authSlice';
import { Oval } from 'react-loader-spinner';

const Activate = ({
  status,
}) => {
  const params = useParams(); // uid, token

  const dispatch = useDispatch();

  const accountActivated = useSelector(activate);
  // const accountStatus = useSelector(accountActivated);

  const { message } = useSelector((state) => state.message);

  const activated = useSelector(state => state);

  const error = activated.activate.error.message;

  const loading = activated.activate.status;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activate_account = (activateValues) => {
    const {
      uid = params.uid,
      token = params.token
    } = activateValues

    // setAccountActivated(false);

    dispatch(activate({ uid, token }))
      .unwrap()
      .then(() => {
        // setAccountActivated(true);
        // loading(false);
      })
      .catch(() => {
        // accountActivated(false);
        // accountStatus = 'idle';
      });
  }

  /* if (activate && !loading)
    return <Navigate to='/' />; */

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto">
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
              onClick={activate_account}
              className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Activate Account
            </button>
          }
        </div>
        {message && (
          <div className="flex w-full justify-center shadow-sm rounded-md mt-4">
            <div
              className={(error !== "Rejected") ? "bg-green-600 py-4 px-6 rounded-md flex items-center" : "bg-red-600 py-4 px-6 rounded-md flex items-center"}
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Activate