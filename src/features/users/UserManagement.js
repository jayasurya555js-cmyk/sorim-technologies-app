import React, { useState } from 'react';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import UserDialog from './UserDialog';
import UsersTable from './UsersTable';

function UserManagement({ users, onUsersChange }) {
    const [activeTab, setActiveTab] = useState('Student');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const openAddDialog = () => { setSelectedUser(null); setDialogOpen(true); };
    const openEditDialog = (user) => { setSelectedUser(user); setDialogOpen(true); };

    const saveUser = (user) => {
        onUsersChange((current) => selectedUser
            ? current.map((row) => row.admission === selectedUser.admission ? user : row)
            : [user, ...current]);
        setActiveTab(user.type === 'Teacher' ? 'Teachers' : user.type === 'Other' ? 'Others' : 'Student');
        setDialogOpen(false);
    };

    return (
        <>
            <UsersTable
                activeTab={activeTab}
                onTabChange={setActiveTab}
                rows={users}
                onAddClick={openAddDialog}
                onEdit={openEditDialog}
                onDelete={setUserToDelete}
            />
            {dialogOpen && <UserDialog user={selectedUser} defaultType={activeTab === 'Teachers' ? 'Teacher' : activeTab === 'Others' ? 'Other' : 'Student'} onClose={() => setDialogOpen(false)} onSave={saveUser} />}
            {userToDelete && <ConfirmDeleteDialog user={userToDelete} onCancel={() => setUserToDelete(null)} onConfirm={() => { onUsersChange((current) => current.filter((row) => row.admission !== userToDelete.admission)); setUserToDelete(null); }} />}
        </>
    );
}

export default UserManagement;