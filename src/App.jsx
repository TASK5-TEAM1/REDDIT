import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} /> 
          
          <Route path="/profile" element={<div>Profile Page </div>} /> 
          
          <Route path="/r/:subredditName" element={<div>Subreddit Page </div>} />
          
          <Route path="/submit" element={<div>Create Post Page </div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;