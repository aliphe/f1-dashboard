import React from 'react';
import DriversList from './features/drivers/driversList';

export const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to f1-dashboard!</h1>
      <DriversList />
    </div>
  );
};

export default App;
