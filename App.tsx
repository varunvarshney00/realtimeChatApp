import React from 'react';
import Navigation from './src/screens/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

const App = () => {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;