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

export default App
