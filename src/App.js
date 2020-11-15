import logo from './logo.svg';
import './App.css';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import FirstStep from './components/firststep';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
           <FirstStep/> 
      </div>
    </Provider>
    
  );
}

export default App;
