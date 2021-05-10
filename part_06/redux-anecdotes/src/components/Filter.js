import { useDispatch } from "react-redux";

import { setNewFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => dispatch(setNewFilter(event.target.value));

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
