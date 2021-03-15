import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  const toggle = () => setVisibility(!visible);

  useImperativeHandle(ref, () => {
    return { toggle };
  })

  const childrenVisibility = { display: visible ? '' : 'none' };
  const toggleButtonVisibility = { display: visible ? 'none' : '' };

  return (
    <div>
      <div style={toggleButtonVisibility}>
        <button onClick={() => setVisibility(true)}>
          {props.buttonLable}
        </button>
      </div>

      <div style={childrenVisibility}>
        {props.children}
        <button onClick={() => setVisibility(false)}>
          hide
        </button>
      </div>
    </div>
  )
});

Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired,
};

export default Togglable;
