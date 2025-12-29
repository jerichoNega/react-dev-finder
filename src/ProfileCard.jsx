// src/ProfileCard.jsx
function ProfileCards({ data }) {
  const {
    login,
    avatar_url,
    bio,
    followers,
    following,
    public_repos,
    html_url
  } = data;

  return (
    <div className="profile-card">
      
      <img src={avatar_url} alt={`${login}'s avatar`} className="avatar" />

      
      <div className="content-wrapper">
        <div className="profile-header">
          <div className="name-box">
            <h2>{login}</h2>
            <a href={html_url} target="_blank" rel="noopener noreferrer" className="github-link">
              @{login}
            </a>
          </div>
        </div>

        <p className="bio">{bio || "This user has no biography available."}</p>

        <div className="stats-box">
          <div className="stat">
            <p className="stat-label">Repos</p>
            <p className="stat-value">{public_repos}</p>
          </div>
          <div className="stat">
            <p className="stat-label">Followers</p>
            <p className="stat-value">{followers}</p>
          </div>
          <div className="stat">
            <p className="stat-label">Following</p>
            <p className="stat-value">{following}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCards;