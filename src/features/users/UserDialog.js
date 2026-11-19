import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';
import subjects from '../dashboard/data/subjects';
import { dateForInput, dateForTable } from './dateFormat';

function FormField({ label, htmlFor, wide = false, children }) {
    return (
        <div className={`form-field${wide ? ' form-field-wide' : ''}`}>
            <label htmlFor={htmlFor}>{label}</label>
            {children}
        </div>
    );
}

function UserDialog({ user, defaultType, onClose, onSave }) {
    const [initialStd, initialSection] = (user?.className || '').split(' - ');
    const [fields, setFields] = useState(() => ({
        type: user?.type || defaultType || 'Student',
        name: user?.name || '',
        classSection: user?.section || initialSection || '',
        std: user?.std || initialStd || '',
        subject: user?.subject || (user?.type === 'Teacher' ? user.className : ''),
        role: user?.role || (user?.type === 'Other' ? user.className : ''),
        dob: dateForInput(user?.dob || ''),
        gender: user?.gender || '',
        parent: user?.parent || '',
        mobile: user?.mobile || '',
        alternateMobile: user?.alternateMobile || '',
    }));
    const isStudent = fields.type === 'Student';
    const isTeacher = fields.type === 'Teacher';
    const update = (key) => (event) => setFields((current) => ({ ...current, [key]: event.target.value }));

    const submit = (event) => {
        event.preventDefault();
        const typePrefix = isStudent ? 'SIS' : isTeacher ? 'TCH' : 'USR';
        const className = isStudent ? `${fields.std} - ${fields.classSection}` : isTeacher ? fields.subject : fields.role;
        onSave({
            ...user,
            admission: user?.admission || `${typePrefix}-${Date.now()}`,
            type: fields.type,
            name: fields.name.trim(),
            className,
            std: isStudent ? fields.std : '',
            section: isStudent ? fields.classSection : '',
            subject: isTeacher ? fields.subject : '',
            role: fields.type === 'Other' ? fields.role : '',
            dob: dateForTable(fields.dob),
            gender: fields.gender,
            parent: isStudent ? fields.parent.trim() : '',
            mobile: fields.mobile,
            alternateMobile: isStudent ? fields.alternateMobile : '',
        });
    };

    return (
        <div className="modal-backdrop user-form-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <form className="student-dialog" onSubmit={submit} aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                <div className="dialog-heading">
                    <button className="icon-button dialog-back" type="button" aria-label="Back to users" onClick={onClose}><Icon name="back" /></button>
                    <h2 id="dialog-title">{user ? 'Edit User' : 'Add User'}</h2>
                    <div className="dialog-header-actions">
                        <button className="icon-button dialog-close" type="button" aria-label="Cancel" onClick={onClose}><Icon name="close" /></button>
                        <button className="icon-button dialog-top-submit" type="submit" aria-label={user ? 'Save changes' : 'Create user'}><Icon name="check" /></button>
                    </div>
                </div>
                <div className="form-grid">
                    <FormField label="User Type" htmlFor="user-type" wide>
                        <select id="user-type" value={fields.type} onChange={update('type')}>
                            <option>Student</option><option>Teacher</option><option>Other</option>
                        </select>
                    </FormField>
                    <FormField label={isStudent ? 'Student Name' : isTeacher ? 'Teacher Name' : 'User Name'} htmlFor="user-name" wide>
                        <input id="user-name" autoFocus value={fields.name} onChange={update('name')} placeholder="Enter name" required />
                    </FormField>
                    {isStudent && <>
                        <FormField label="Class" htmlFor="user-class">
                            <select id="user-class" value={fields.classSection} onChange={update('classSection')} required>
                                <option value="">Select class</option><option>A</option><option>B</option><option>C</option>
                            </select>
                        </FormField>
                        <FormField label="Std" htmlFor="user-std">
                            <select id="user-std" value={fields.std} onChange={update('std')} required>
                                <option value="">Select standard</option>
                                {Array.from({ length: 12 }, (_, index) => {
                                    const number = index + 1;
                                    const suffix = number === 1 ? 'st' : number === 2 ? 'nd' : number === 3 ? 'rd' : 'th';
                                    return <option key={number}>{`${number}${suffix}`}</option>;
                                })}
                            </select>
                        </FormField>
                    </>}
                    {isTeacher && <FormField label="Subject" htmlFor="user-subject">
                        <select id="user-subject" value={fields.subject} onChange={update('subject')} required>
                            <option value="">Select subject</option>{subjects.map((subject) => <option key={subject.name}>{subject.name}</option>)}
                        </select>
                    </FormField>}
                    {fields.type === 'Other' && <FormField label="Role" htmlFor="user-role">
                        <select id="user-role" value={fields.role} onChange={update('role')} required>
                            <option value="">Select role</option><option>Administrator</option><option>Office staff</option><option>Support staff</option>
                        </select>
                    </FormField>}
                    <FormField label="DOB" htmlFor="user-dob">
                        <input id="user-dob" type="date" value={fields.dob} onChange={update('dob')} required />
                    </FormField>
                    <FormField label="Gender" htmlFor="user-gender">
                        <select id="user-gender" value={fields.gender} onChange={update('gender')} required>
                            <option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option>
                        </select>
                    </FormField>
                    {isStudent && <FormField label="Parent/Guardian Name" htmlFor="user-parent" wide>
                        <input id="user-parent" value={fields.parent} onChange={update('parent')} placeholder="Enter parent or guardian name" required />
                    </FormField>}
                    <FormField label="Mobile No." htmlFor="user-mobile">
                        <input id="user-mobile" type="number" inputMode="numeric" min="0" value={fields.mobile} onChange={update('mobile')} placeholder="Enter mobile number" required />
                    </FormField>
                    {isStudent && <FormField label="Mobile No. (Alternative)" htmlFor="user-mobile-alternative">
                        <input id="user-mobile-alternative" type="number" inputMode="numeric" min="0" value={fields.alternateMobile} onChange={update('alternateMobile')} placeholder="Optional" />
                    </FormField>}
                </div>
                <div className="dialog-actions">
                    <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
                    <button className="primary-button dialog-submit" type="submit">{user ? 'Save Changes' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
}

export default UserDialog;