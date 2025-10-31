import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { fetchHotPosts } from '../api/apiClient';
import PostListItem from '../components/PostListItem';

function Home() {
    const { hotPosts, updateHotPosts, setIsLoading, isLoading } = useGlobalState();

    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetchHotPosts(); 
                if (response.success) {
                    updateHotPosts(response.data); 
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (hotPosts.length === 0) {
            loadPosts();
        }
    }, [updateHotPosts, setIsLoading, hotPosts.length]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="home-feed-container">
            <h2>🔥 Hot Posts</h2>
            {hotPosts.map(post => (
                <PostListItem key={post.id} post={post} /> 
            ))}
            {hotPosts.length === 0 && !isLoading && <p>No posts found. Check API stub.</p>}
        </div>
    );
}

export default Home;