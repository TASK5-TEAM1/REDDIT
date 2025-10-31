const DUMMY_POSTS = [
    { id: 'p1', title: 'Welcome to the Reddit Clone!', subreddit: 'r/reactdev', upvotes: 420, author: 'Anirudh' },
    { id: 'p2', title: 'Why is Vite so fast?', subreddit: 'r/webdev', upvotes: 310, author: 'Vaibhav' },
    { id: 'p3', title: 'Implementing PKCE Flow', subreddit: 'r/security', upvotes: 250, author: 'Jahnavi' },
    { id: 'p4', title: 'Nested Comments Preview', subreddit: 'r/frontend', upvotes: 180, author: 'Rajat' },
];

export const fetchHotPosts = () => {
    console.log('API Client: Simulating fetching hot posts...');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                success: true, 
                data: DUMMY_POSTS 
            });
        }, 500);
    });
};

export const loginUser = (credentials) => {
    return { success: true, token: 'dummy_token' };
};

export const fetchProfile = (token) => {
    return { id: 'u1', username: 'AnirudhDev', email: 'anirudh@dev.com' };
};