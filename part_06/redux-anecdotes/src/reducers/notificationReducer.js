const initialNotification = 'Welcome to the most primitive app!';

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET': return action.notification;
    case 'ERASE': return null;
    default: return state;
  }
};

export const setNotification = (notification, timeOut) => {
  return (dispatch) => {
    dispatch({ type: 'SET', notification });
    if (timeOut) {
      setTimeout(() => dispatch({ type: 'ERASE' }), timeOut * 1000);
    }
  };
};

export const eraseNotification = () => {
  return {
    type: 'ERASE',
  };
};

export default notificationReducer;
