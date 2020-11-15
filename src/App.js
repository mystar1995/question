
import './App.css';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import FirstStep from './components/firststep';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <React.StrictMode>
           <FirstStep/> 
        </React.StrictMode>
      </div>
    </Provider>
    
  );
}

export default App;
