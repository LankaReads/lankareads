import React from 'react';
import './ProfileCard.css';
import ProPic from '../../img/PP.png';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card-container col-12 col-md-4 d-flex flex-row">
      <div className="profile-card-inner row g-0 d-flex align-items-center justify-content-start">
        {/* <div className="profile-pic-container col-3 col-sm-2">
          <img src={ProPic} className="profile-pic" alt="User" />
        </div> */}
        <div className="profile-info col-9 col-sm-10">
          <div className="profile-card-body">
            {user ? (
              <>
                <h5 className="profile-card-title">Hi, {user.name}</h5>
                <p className="profile-card-text">{user.email}</p>
              </>
            ) : (
              <>
                <h5 className="profile-card-title">Hi, User</h5>
                <p className="profile-card-text">Example@gmail.com</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
