import React from 'react'
import Profile from '../Profile'
import ProfileEditDetails from './ProfileEditDetails'

const ProfileEditDetailsPage = () => {
    return (
        <Profile currentPage="Edit Details">
            <ProfileEditDetails/>
        </Profile>
    )
}

export default ProfileEditDetailsPage
