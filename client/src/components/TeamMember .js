import React from 'react';

const TeamMember = ({ name, role, bio, imageUrl }) => {
    return (
        <div className="team-member-card">
            <div className="team-member-image">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="team-member-info">
                <h3>{name}</h3>
                <p>{role}</p>
                <p>{bio}</p>
            </div>
        </div>
    );
};

export default TeamMember;
