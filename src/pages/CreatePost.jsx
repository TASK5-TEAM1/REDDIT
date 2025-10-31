import React,{useState} from 'react';
import './CreatePost.css';

export function CreatePost() {
    //we will be using usestate to remember what the user is typing
    const [title,Settitle]=useState('');
    const [subReddit,setsubReddit]=useState('');
    const [text,setText]=useState('');


    const handleSubmit=(event)=>{       //this function runs on clicking submit btn
        event.preventDefault();         //this stops the page from doing full refresh
        
        const postData={
            kind:'self',
            title:title,
            subReddit:subReddit,
            text:text
        };
        console.log("Post Data to submit:",postData);
        
    };
    return(
        <div className="create-post">
            <h2>Create a Text Post</h2>
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="form-grp">
                    <label>Subreddit:</label>
                    <input type="text"
                    value={subReddit}
                    onChange={(e)=>setsubReddit(e.target.value)}
                    placeholder="eg react.js" required />
                </div>
                <div className="form-grp">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => Settitle(e.target.value)}
                    placeholder="Yout Title" required />
                </div>
                <div className="form-grp">
                    <label>Text:</label>
                    <textarea 
                    value={text}
                    onChange={(e)=>setText(e.target.value)} placeholder="Your Text" rows="8" />
                </div>
                <button type="submit" className="submit-btn">Submit Post</button>
            </form>
        </div>
    );
    
}