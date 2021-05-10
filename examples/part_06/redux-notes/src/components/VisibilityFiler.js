import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const filterSelected = (value) => {
    dispatch(filterChange(value));
  };

  return (
    <div>
      all <input type='radio' name='filter' onChange={() => filterSelected('ALL')} />
      important <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')} />
      unimportant <input type='radio' name='filter' onChange={() => filterSelected('UNIMPORTANT')} />
    </div>
  );
};

export default VisibilityFilter;
