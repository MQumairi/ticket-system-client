import React from 'react'
import Profile from '../Profile'
import ProfileDefault from './ProfileDefault'

const ProfileDefaultPage = () => {
    return (
        <Profile currentPage="Your Profile">
            <ProfileDefault/>
        </Profile>
    )
}

export default ProfileDefaultPage
