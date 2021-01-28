import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  } else {
    return <h1 className='notification'>{notification}</h1>
  }
};

export default Notification;
