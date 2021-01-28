import React from 'react';

const Notification = ({ notification, error }) => {
  if (notification === null) {
    return null;
  } else if (error) {
    return <h1 className='message error'>{notification}</h1>
  } else {
    return <h1 className='message notification'>{notification}</h1>
  }
};

export default Notification;
