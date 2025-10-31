import React from 'react';
import { Link } from 'react-router-dom';

function PostListItem({ post }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <div style={{ float: 'left', marginRight: '10px', textAlign: 'center' }}>
                ⬆️
                <div>{post.upvotes}</div>
                ⬇️
            </div>

            <div>
                <Link to={`/r/${post.subreddit}`} style={{ color: 'blue', textDecoration: 'none', fontWeight: 'bold' }}>
                    {post.subreddit}
                </Link>
                <span> • Posted by u/{post.author}</span>
                
                <Link to={`/r/${post.subreddit}/comments/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <h3>{post.title}</h3>
                </Link>
            </div>
            <div style={{ clear: 'both' }}></div>
        </div>
    );
}

export default PostListItem;