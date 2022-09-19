import Layout from '../../hocs/Layout';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { activate } from '../../features/auth/authSlice';
import {useNotification} from '../../hooks/useNotification';
import { Oval } from 'react-loader-spinner';

const Activate = ({
  status,
}) => {
  const params = useParams(); // uid, token

  const dispatch = useDispatch();

  const accountActivated = useSelector(state => state.auth.isActivated);
  console.log('accountActivated', accountActivated);
  const { displayNotification } = useNotification();

  const estado = useSelector(state => state.auth.status); // 'idle' | 'pending' | 'fulfilled' |  'rejected'
  console.log('estado', estado);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activate_account = (activateValues) => {
    const {
      uid = params.uid,
      token = params.token
    } = activateValues

    dispatch(activate({ uid, token }))
      .unwrap()
      .then(() => {
        displayNotification({message: 'Tu cuenta se ha activado exitosamente, ya puedes logearte con tus credenciales', type: 'success'});
      })
      .catch(() => {
        displayNotification({ message: 'hubo un error al activar tu cuenta, posiblemente el enlace ya ha caducado, solicita uno nuevo', type: 'error', timeout: 15000 });
      });
  }

  if (accountActivated && (estado !== 'pending'))
    return <Navigate to='/login' />;

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        {!accountActivated && (
          <div className="max-w-3xl mx-auto">
            {(estado === 'pending') ?
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
        )}
        {/* {message && (
          <div className="flex w-full justify-center shadow-sm rounded-md mt-4">
            <div
              className={(error !== "Rejected") ? "bg-green-600 py-4 px-6 rounded-md flex items-center" : "bg-red-600 py-4 px-6 rounded-md flex items-center"}
              role="alert"
            >
              {message}
            </div>
          </div>
        )} */}
      </div>
    </Layout>
  )
}

export default Activate
