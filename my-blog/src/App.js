import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className='content'>
        {/* Main Content */}
      </main>
      <Footer />
      {/* Other components and content */}
    </div>
  );
};

export default App;
