import { connect } from 'react-redux';

import { setNewFilter } from '../reducers/filterReducer';

const Filter = ({ setNewFilter }) => {
  const handleChange = (event) => setNewFilter(event.target.value);

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = { setNewFilter };

export default connect(null, mapDispatchToProps)(Filter);
