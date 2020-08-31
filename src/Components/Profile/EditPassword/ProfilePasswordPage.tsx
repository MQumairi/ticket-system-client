import React from 'react'
import Profile from '../Profile'
import ProfilePassword from './ProfilePassword'

const ProfilePasswordPage = () => {
    return (
        <Profile currentPage="Security">
            <ProfilePassword/>
        </Profile>
    )
}

export default ProfilePasswordPage
