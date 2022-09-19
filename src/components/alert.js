// import { useSelector } from 'react-redux';
import { Fragment } from 'react';

import { CheckCircleIcon } from '@heroicons/react/solid';

function Alert({ alert }) {

  // const alerta = useSelector(state => state.alertType);

  const displayAlert = () => {
    if (alert !== null) {
      return (
        <div className='rounded-md bg-blue-50 p-4'>
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className='h-5 w-5 text-blue-400' aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className='text-sm font-medium text-blue-800'>alert_msg</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Fragment></Fragment>
      )
    }
  };

  return (
    <Fragment>
      {displayAlert()}
    </Fragment>
  )
}


export default Alert;
