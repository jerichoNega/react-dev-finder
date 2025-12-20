import React, { useEffect, useState } from "react";
import ProfileCards from "./ProfileCard";


function App() {
  const [ username, setUsername ] = useState('octocat');

  const [ userData, setUserData ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ theme, setTheme ] = useState(() => {
      const savedTheme = localStorage.getItem('saved-theme');
      return savedTheme ? savedTheme : 'dark';
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'dark' ? 'light' : 'dark')
  };

  useEffect(() => {
    localStorage.setItem('saved-theme', theme)
    document.body.className = theme;
  }, [theme]);


  const fetchGitHubUser = async (user) => {
    if(!user) return;
    try{
      setError(null)
    const response = await fetch(`https://api.github.com/users/${user}`);
      
      if(!response.ok) {
        throw new Error('Error fetching the user data, or the user doesnt exist.')
      }
    const data = await response.json();
    setUserData(data);

    }catch(e){
      setError(e.message);
      setUserData(null);
    }
  }
  useEffect(() => {
    fetchGitHubUser(username);
  }, [username]);

return (
  <div className="devfinder-container">
    <header className="app-header">
      <h1 className="logo">DevFinder</h1>
      <button className="theme-btn" onClick={toggleTheme}>
        { theme === 'dark' ? 'light ☀️' : 'dark 🌙' }
      </button>
    </header>
    <div className="search-box">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {  
            fetchGitHubUser(username)
          }}
          
        }
      />
      <button onClick={() => fetchGitHubUser(username)}>Search</button>
      </div>

     
      {error ? (
        <p className="error-message">{error}</p>
      ) : userData ? (
        <ProfileCards data={userData}/>
      ) : (
        <p className="Loading">Loading...</p>
              )}
  </div>
)
}
export default App;