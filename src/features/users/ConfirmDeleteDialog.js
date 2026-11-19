import React from 'react';
import Icon from '../../components/ui/Icon';

function ConfirmDeleteDialog({ user, onCancel, onConfirm }) {
    return (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
            <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
                <div className="dialog-heading">
                    <h2 id="delete-dialog-title">Delete user?</h2>
                    <button className="icon-button dialog-close" type="button" aria-label="Cancel deletion" onClick={onCancel}><Icon name="close" /></button>
                </div>
                <p id="delete-dialog-description">Delete <strong>{user.name}</strong>? This action cannot be undone.</p>
                <div className="dialog-actions">
                    <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button>
                    <button className="danger-button" type="button" onClick={onConfirm}>Delete</button>
                </div>
            </section>
        </div>
    );
}

export default ConfirmDeleteDialog;