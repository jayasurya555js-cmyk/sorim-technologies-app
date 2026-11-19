import React from 'react';
import Icon from '../../components/ui/Icon';

function UsersTable({ activeTab, onTabChange, rows, onAddClick, onEdit, onDelete }) {
    const activeType = activeTab === 'Teachers' ? 'Teacher' : activeTab === 'Others' ? 'Other' : 'Student';
    const filteredRows = rows.filter((row) => (row.type || 'Student') === activeType);
    const thirdColumnTitle = activeTab === 'Teachers' ? 'Subject' : activeTab === 'Others' ? 'Role' : 'Class';

    return (
        <section className="students-section" aria-labelledby="users-title">
            <div className="students-title-row"><h2 id="users-title">Users</h2><button className="primary-button add-button" aria-label="Add" onClick={onAddClick}><Icon name="plus" size={17} /><span>Add</span></button></div>
            <div className="students-panel">
                <div className="student-tabs" role="tablist" aria-label="User category">
                    {['Student', 'Teachers', 'Others'].map((tab) => <button key={tab} role="tab" aria-selected={activeTab === tab} className={`student-tab${activeTab === tab ? ' selected' : ''}`} onClick={() => onTabChange(tab)}>{tab}</button>)}
                </div>
                <div className="table-scroll">
                    <table>
                        <thead><tr><th>Admission No.</th><th>{activeTab === 'Teachers' ? 'Teacher Name' : activeTab === 'Others' ? 'User Name' : 'Student Name'}</th><th>{thirdColumnTitle}</th><th>DOB</th><th>Gender</th><th>Parent/Guardian Name</th><th>Mobile No.</th><th>Action</th></tr></thead>
                        <tbody>{filteredRows.map((row) => <tr key={row.admission}>
                            <td>{row.admission}</td>
                            <td><span className="student-name">{row.name}</span></td>
                            <td>{row.className}</td><td>{row.dob}</td><td>{row.gender}</td><td>{row.parent}</td><td>{row.mobile}</td>
                            <td><div className="row-actions"><button className="row-action edit-action" title="Edit user" aria-label={`Edit ${row.name}`} onClick={() => onEdit(row)}><Icon name="edit" size={15} /></button><button className="row-action delete-action" title="Delete user" aria-label={`Delete ${row.name}`} onClick={() => onDelete(row)}><Icon name="delete" size={15} /></button></div></td>
                        </tr>)}</tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default UsersTable;