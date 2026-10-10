import './ProfileCard.css'

function ProfileCard({ profile }) {
  return (
    <article className="profile">
      <img
        className="profile__avatar"
        src={profile.avatarUrl}
        alt={`Foto de perfil de ${profile.name}`}
        width="220"
        height="220"
      />
      <div className="profile__info">
        <h2 className="profile__name">
          <a href={profile.profileUrl} target="_blank" rel="noreferrer">
            {profile.name}
          </a>
        </h2>
        {profile.bio ? (
          <p className="profile__bio">{profile.bio}</p>
        ) : (
          <p className="profile__bio profile__bio--empty">Este usuário ainda não escreveu uma bio.</p>
        )}
      </div>
    </article>
  )
}

export default ProfileCard
