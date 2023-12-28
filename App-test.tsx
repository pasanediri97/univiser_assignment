import 'react-native';
import React from 'react';
 
import {it} from '@jest/globals';
 
import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
import store from 'redux/store';
import App from 'App';

it('App renders correctly', () => {
  const component = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(component);

  expect(component).toBeDefined();
});
