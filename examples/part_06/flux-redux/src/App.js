const App = ({ store }) => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>

      <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>

      <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>
    </div>
  );
};

export default App;
