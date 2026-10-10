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
        <h2 className="profile__name">{profile.name}</h2>
        <p className="profile__bio">{profile.bio}</p>
      </div>
    </article>
  )
}

export default ProfileCard
