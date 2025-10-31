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
import { useState } from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import { CreatePost } from './pages/CreatePost';
import VotingButtons from './components/VotingButtons';

function TempHome() {
  return(
    <div style={{padding:'20px'}}>
      <h2>Home(Test Page)</h2>
      <p>Here is the voting buttons in action:</p>
      <VotingButtons initialScore={10} initialLikes={null}/>

      <p style={{marginTop:'20px'}}>Here is another one, already upvoted:</p>
      <VotingButtons initialScore={42} initialLikes={true} />
    </div>
  );
}

function App() {
  return (
    <div>
      <nav style={{padding:'10px',background:'#eee'}}>
        <Link to="/">Home</Link> | <Link to="/submit">Create Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TempHome />} />
        <Route path="/submit" element={<CreatePost />}/>
      </Routes>
    </div>
    
  )
}

export default App;