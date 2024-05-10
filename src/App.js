import { Provider } from 'react-redux';
import './App.css';
import appStore from './utils/appStore';
import FilterConatiner from './components/FilterContainer';
import JobContainer from './components/JobContainer';

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
             <FilterConatiner />
             <JobContainer />
      </Provider>
    </div>
  );
}

export default App;
