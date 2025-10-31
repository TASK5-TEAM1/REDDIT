import React, { useState, useEffect, useContext } from 'react';

// --- CUSTOM INLINE SVG ICONS (REPLACEMENT FOR 'lucide-react' to ensure self-contained file) ---

const Icon = ({ children, className = "w-6 h-6", spin = false }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`${className} ${spin ? 'animate-spin' : ''}`}
    >
        {children}
    </svg>
);

const IconLogIn = (props) => (
    <Icon {...props}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
    </Icon>
);

const IconLogOut = (props) => (
    <Icon {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </Icon>
);

const IconUser = (props) => (
    <Icon {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </Icon>
);

const IconLoader2 = (props) => (
    <Icon {...props} spin={true}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Icon>
);

const IconHome = (props) => (
    <Icon {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
);

const IconBarChart = (props) => (
    <Icon {...props}>
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
    </Icon>
);

const IconMessageCircle = (props) => (
    <Icon {...props}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Icon>
);

const IconArrowUp = (props) => (
    <Icon {...props}>
        <path d="m5 12 7-7 7 7" />
        <path d="M12 17V5" />
    </Icon>
);

const IconArrowDown = (props) => (
    <Icon {...props}>
        <path d="M12 5v12" />
        <path d="m19 12-7 7-7-7" />
    </Icon>
);

// --- CONFIGURATION CONSTANTS (REPLACE WITH YOUR REDDIT APP DETAILS) ---
const CLIENT_ID = 'YOUR_REDDIT_CLIENT_ID'; 
// REDIRECT_URI must match the URL registered with Reddit, typically ending in /callback
const REDIRECT_URI = window.location.origin + '/callback'; 
const SCOPES = 'identity read mysubreddits';
const REDDIT_AUTH_URL = 'https://www.reddit.com/api/v1/authorize';
const MOCK_TOKEN_DURATION_SECONDS = 3600;

// --- UTILITY FUNCTIONS FOR PKCE ---

/**
 * Generates a high-entropy string for the code_verifier.
 */
const generateCodeVerifier = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  for (let i = 0; i < 128; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return verifier;
};

/**
 * Creates the code_challenge by SHA256 hashing and Base64Url encoding the verifier.
 */
const generateCodeChallenge = async (verifier) => {
  // Hash the verifier
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  // Ensure crypto is available (it is in modern browser contexts)
  if (typeof crypto.subtle === 'undefined') {
    console.error("Cryptography API not available. Cannot generate code challenge.");
    return "";
  }
  const hash = await crypto.subtle.digest('SHA-256', data);
  
  // Base64Url encode the hash
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// --- AUTH CONTEXT SETUP ---
const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

// --- Auth Provider Component (Handles State Management and PKCE Logic) ---
const AuthProviderWithRouter = ({ children }) => {
  // user object holds identity data ({ name: '...', created: '...' })
  const [user, setUser] = useState(null); 
  // accessToken holds the token string
  const [accessToken, setAccessToken] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom API Client that attaches the token
  const apiClient = async (path, options = {}) => {
    if (!accessToken && !path.includes('/hot')) { 
    }
    
    // In a real app, this would be the Reddit API URL (e.g., https://oauth.reddit.com)
    const mockApiUrl = '/mock/api'; 
    
    const headers = {
      ...options.headers,
      // Authentication is integrated here!
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }), 
      'Content-Type': 'application/json',
    };
    
    // --- Mock API Response for /hot (Subreddit Browsing) ---
    if (path.includes('/hot')) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        children: [
                            { data: { id: 'p1', title: 'Why PKCE is essential for modern OAuth.', subreddit: 'r/security', score: 12567, num_comments: 452, author: 'securibot' } },
                            { data: { id: 'p2', title: 'New features in React 19: Signals and beyond.', subreddit: 'r/reactjs', score: 9812, num_comments: 789, author: 'dev_guru' } },
                            { data: { id: 'p3', title: 'The best place for deep technical discussions.', subreddit: 'r/askscience', score: 3452, num_comments: 121, author: 'scientist_sam' } },
                            { data: { id: 'p4', title: 'My dog learned how to code in JavaScript.', subreddit: 'r/wholesomememes', score: 21300, num_comments: 310, author: 'goodboyowner' } },
                        ]
                    }
                });
            }, 800);
        });
    }

    // Mock API response based on path for profile
    if (path === '/user/me') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            // Use current user name or a mock if context is not fully loaded
            name: user?.name || 'mocked_user', 
            created_utc: user?.created_utc || Date.now() / 1000,
            karma: Math.floor(Math.random() * 100000),
            is_mod: Math.random() > 0.8,
          });
        }, 500);
      });
    }

    // Default mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true, message: `Data fetched successfully with token for path: ${path}` },
        });
      }, 500);
    });
  };

  const login = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Generate verifier and challenge (PKCE Step 1)
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      
      // 2. Store verifier for later exchange
      localStorage.setItem('code_verifier', verifier);
      
      // 3. Build authorization URL
      const authUrl = new URL(REDDIT_AUTH_URL);
      authUrl.searchParams.append('client_id', CLIENT_ID);
      authUrl.searchParams.append('response_type', 'code');
      // Simple CSRF protection
      authUrl.searchParams.append('state', Math.random().toString(36).substring(2, 15)); 
      authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
      authUrl.searchParams.append('duration', 'temporary'); 
      authUrl.searchParams.append('scope', SCOPES);
      authUrl.searchParams.append('code_challenge', challenge);
      authUrl.searchParams.append('code_challenge_method', 'S256');
      
      // 4. Redirect user
      window.location.replace(authUrl.toString());
      
    } catch (e) {
      console.error('Login initiation error:', e);
      setError('Failed to initiate login flow.');
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setAccessToken(null);
    setUser(null);
    // Clear persisted data
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expiry');
    window.history.pushState({}, '', '/'); 
    // Trigger re-render of App component to update route
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Initial Check for persisted session
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user_data');
    const expiry = localStorage.getItem('token_expiry');
    
    if (storedToken && storedUser && expiry && Date.now() < parseInt(expiry)) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const value = {
    user, setUser,
    accessToken, setAccessToken,
    isAuthenticated: !!accessToken,
    isLoading,
    error, setError,
    login,
    logout,
    apiClient,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- COMPONENTS ---

// 1. Navigation/Header Component
const NavHeader = () => {
    const { isAuthenticated, login, logout } = useAuth();
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // Listen for route changes
    useEffect(() => {
        const handlePopState = () => setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };
    
    return (
      <nav className="bg-gray-800 text-white shadow-lg p-4 flex justify-between items-center fixed w-full top-0 z-10">
        <div className="flex items-center space-x-4">
          <IconBarChart className="w-6 h-6 text-red-500" />
          <span className="text-xl font-bold">ViteReddit Auth</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-1 rounded transition-colors ${currentPath === '/' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            <IconHome className="inline w-4 h-4 mr-1" /> Home
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate('/profile')}
              className={`px-3 py-1 rounded transition-colors ${currentPath === '/profile' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
            >
              <IconUser className="inline w-4 h-4 mr-1" /> Profile
            </button>
          )}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center shadow-lg"
            >
              <IconLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center shadow-lg"
            >
              <IconLogIn className="w-4 h-4 mr-2" />
              Login with Reddit
            </button>
          )}
        </div>
      </nav>
    );
  };

// 2. OAuth Redirect Handler Component (PKCE Step 2 & 3)
const ContextAuthCallback = () => {
    const { setAccessToken, setUser, setError } = useAuth();
    const [status, setStatus] = useState('Exchanging code for token...');
    const [isProcessing, setIsProcessing] = useState(true);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setStatus(`Authentication Error: ${error}`);
        setError(`Reddit Auth Error: ${error}`);
        setIsProcessing(false);
        return;
      }

      if (!code) {
        setStatus('Error: Authorization code not found in URL.');
        setError('Authorization code missing.');
        setIsProcessing(false);
        return;
      }

      const exchangeCode = async () => {
        // Retrieve the verifier
        const codeVerifier = localStorage.getItem('code_verifier');
        localStorage.removeItem('code_verifier'); 

        if (!codeVerifier) {
          setStatus('Error: Code verifier not found. Authentication flow failed.');
          setError('Code verifier missing.');
          setIsProcessing(false);
          return;
        }
        
        // --- MOCK TOKEN EXCHANGE ---
        setStatus('Simulating secure token exchange on backend...');
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        // This is where your backend would make a POST request to:
        // https://www.reddit.com/api/v1/access_token 
        // with grant_type=authorization_code, code, redirect_uri, and code_verifier

        // MOCK SUCCESS: Generate a placeholder token and user data
        const mockAccessToken = `mock_token_${Math.random().toString(36).substring(2, 12)}`;
        const mockUserData = {
          name: `redditor_${Math.random().toString(36).substring(2, 6)}`,
          created_utc: Date.now() / 1000,
        };

        // Update Auth Context and Local Storage
        setAccessToken(mockAccessToken);
        setUser(mockUserData);
        
        localStorage.setItem('access_token', mockAccessToken);
        localStorage.setItem('user_data', JSON.stringify(mockUserData));
        localStorage.setItem('token_expiry', (Date.now() + MOCK_TOKEN_DURATION_SECONDS * 1000).toString());

        setStatus('Success! Token acquired. Redirecting...');
        setIsProcessing(false);
        
        setTimeout(() => navigate('/profile'), 1000);
      };

      exchangeCode();
    }, [setAccessToken, setUser, setError]); // navigate is intentionally excluded from dependencies
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            OAuth Callback
          </h2>
          <div className={`flex items-center justify-center p-4 rounded-lg ${isProcessing ? 'bg-blue-100' : 'bg-green-100'}`}>
            {isProcessing ? <IconLoader2 className="w-6 h-6 mr-3 text-blue-500" /> : <IconBarChart className="w-6 h-6 mr-3 text-green-600" />}
            <p className={`${isProcessing ? 'text-blue-700' : 'text-green-700'} font-medium`}>{status}</p>
          </div>
          {!isProcessing && (
            <button
              onClick={() => navigate('/profile')}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Go to Profile
            </button>
          )}
        </div>
      </div>
    );
};

// 3. Protected User Profile Component
const ProfilePage = () => {
  const { user, apiClient, isLoading: isAuthLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only attempt to fetch if Auth is ready and user is defined
    if (!isAuthLoading && user) {
      const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Use the auth-integrated API client
          const data = await apiClient('/user/me');
          setProfileData(data);
        } catch (err) {
          console.error('API Fetch Error:', err);
          setError('Could not fetch protected user data. Token may be invalid or expired.');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchProfile();
    }
  }, [user, isAuthLoading, apiClient]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <IconLoader2 className="w-8 h-8 text-red-500" />
      </div>
    );
  }

  // Error boundary for API fetch errors
  if (error) {
    return (
      <div className="p-8 text-center pt-24 text-red-600 bg-red-50 rounded-lg max-w-xl mx-auto mt-20 shadow-lg">
        <p className="font-bold text-lg mb-2">Error Fetching Profile Data</p> {error}
        <p className="mt-4 text-sm text-gray-500">Check the console for detailed API errors.</p>
      </div>
    );
  }

  if (isLoading || !profileData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg text-center mt-12">
          <IconLoader2 className="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-blue-700">Fetching protected user profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center mb-6 border-b pb-4">
          <IconUser className="w-12 h-12 text-red-500 p-2 border-2 border-red-500 rounded-full" />
          <h2 className="text-4xl font-extrabold text-gray-900 ml-4">
            Hello, {profileData.name}!
          </h2>
        </div>
        
        <p className="text-gray-600 mb-8">
          This data was retrieved from a **mock protected API** by the `apiClient`, which automatically attached your OAuth Access Token.
        </p>
        
        <div className="space-y-4">
          <DataRow label="Reddit Name" value={profileData.name} />
          <DataRow label="Account Created" value={new Date(profileData.created_utc * 1000).toLocaleDateString()} />
          <DataRow label="Total Karma" value={profileData.karma.toLocaleString()} />
          <DataRow 
            label="Moderator Status" 
            value={profileData.is_mod ? 'Yes' : 'No'} 
            badgeColor={profileData.is_mod ? 'bg-green-500' : 'bg-yellow-500'} 
          />
          <DataRow label="Access Token Status" value="Attached and Validated" badgeColor="bg-blue-500" />
        </div>
      </div>
    </div>
  );
};

// 4. Subreddit Post Component
const PostCard = ({ post }) => {
    return (
        <div className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Voting/Score Column */}
            <div className="flex flex-col items-center justify-start p-2 bg-gray-50 text-gray-700">
                <IconArrowUp className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" />
                <span className="font-bold text-lg my-1">{post.score.toLocaleString()}</span>
                <IconArrowDown className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            </div>

            {/* Content Column */}
            <div className="p-4 flex-grow">
                <div className="text-sm font-medium text-red-600 mb-1">{post.subreddit}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-700 cursor-pointer">
                    {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 space-x-3">
                    <span>Posted by u/{post.author}</span>
                    <span className="text-xs">•</span>
                    <span className="flex items-center">
                        <IconMessageCircle className="w-4 h-4 mr-1" />
                        {post.num_comments} Comments
                    </span>
                </div>
            </div>
        </div>
    );
};

// 5. Subreddit List Page (formerly HomePage)
const SubredditListPage = () => {
  const { apiClient, isLoading: isAuthLoading } = useAuth();
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch the hot listing (mocked for now)
        const response = await apiClient('/hot.json');
        
        if (response.data && response.data.children) {
            const fetchedPosts = response.data.children.map(child => child.data);
            setPosts(fetchedPosts);
        } else {
            throw new Error("Invalid response format from API.");
        }
      } catch (err) {
        console.error('Post Fetch Error:', err);
        setError('Could not fetch subreddit posts. Check network or API client.');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch once Auth loading is resolved (even if not authenticated)
    if (!isAuthLoading) {
        fetchPosts();
    }
  }, [isAuthLoading, apiClient]);

  if (isLoading || isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <IconLoader2 className="w-8 h-8 text-red-500" />
        <p className="mt-4 text-gray-600">Loading Reddit's hot feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center pt-24 text-red-600 bg-red-50 rounded-lg max-w-xl mx-auto mt-20 shadow-lg">
        <p className="font-bold text-lg mb-2">Error Loading Posts</p> {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-24 pb-12 bg-gray-100 min-h-screen">
        <div className="w-full max-w-4xl px-4">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
                Hot Posts (r/popular Mock)
            </h1>
            <div className="space-y-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <p className="text-center text-gray-500 mt-8">
                End of mock posts. Log in to see your personalized feed!
            </p>
        </div>
    </div>
  );
};

// 6. Reusable Data Row for Profile
const DataRow = ({ label, value, badgeColor = 'bg-gray-500' }) => (
  <div className="flex justify-between items-center border-b border-gray-100 last:border-b-0 py-2">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-right">
        {label === 'Moderator Status' || label === 'Access Token Status' ? (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold text-white rounded-full ${badgeColor}`}>
            {value}
        </span>
        ) : (
        <span className="text-gray-800 font-medium">{value}</span>
        )}
    </span>
  </div>
);

// 7. RequireAuth Wrapper Component
const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <IconLoader2 className="w-8 h-8 text-red-500" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-sm">
                <p className="text-xl font-bold text-red-600 mb-4">Access Denied</p>
                <p className="text-gray-600 mb-6">You must be logged in to view this protected page.</p>
                <button
                    onClick={login}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md"
                >
                    <IconLogIn className="inline w-5 h-5 mr-2" />
                    Login with Reddit
                </button>
            </div>
        </div>
    );
  }

  return children;
};

// 8. Main App Component (Router)
const App = () => {
  // Use state to track the current URL pathname for routing
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Effect to listen for browser's back/forward buttons or programmatic navigation
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  let PageContent;
  if (currentPath.includes('/callback')) {
    PageContent = <ContextAuthCallback />;
  } else if (currentPath === '/profile') {
    PageContent = <RequireAuth><ProfilePage /></RequireAuth>;
  } else {
    // The default route (/) is now the Subreddit list
    PageContent = <SubredditListPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Load Tailwind CSS and configuration for dynamic styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Inter', 'sans-serif'],
                        },
                    },
                },
            };
          `,
      }} />
      
      <AuthProviderWithRouter>
        <NavHeader />
        {PageContent}
      </AuthProviderWithRouter>
    </div>
  );
};

export default App;
