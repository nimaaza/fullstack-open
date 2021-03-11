import React, { useState, useImperativeHandle } from 'react';

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

export default Togglable;
