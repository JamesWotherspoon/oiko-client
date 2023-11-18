import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearNotification } from '../utils/slices';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.notification);

  useEffect(() => {
    if (message) {
      if (type === 'success') {
        toast.success(message);
      } else if (type === 'error') {
        toast.error(message);
      }

      dispatch(clearNotification());
    }
  }, [message, type, dispatch]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default Notifications;
