import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the dashboard and switches user categories', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /overall users/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /pass percentage/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Student' })).toHaveAttribute('aria-selected', 'true');

  fireEvent.click(screen.getByRole('tab', { name: 'Teachers' }));
  expect(screen.getByRole('tab', { name: 'Teachers' })).toHaveAttribute('aria-selected', 'true');
});

test('keeps Dashboard enabled and disables every other sidebar action', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: 'Dashboard' })).toBeEnabled();
  ['User Management', 'Student Information', 'Academics', 'Front Office', 'Communication', 'Log Out'].forEach((label) => {
    expect(screen.getByRole('button', { name: label })).toBeDisabled();
  });
});

test('adds a student and edits the existing record in the same dialog', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(screen.getByRole('heading', { name: 'Add User' })).toBeInTheDocument();
  expect(screen.getByLabelText('Std')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('User Type'), { target: { value: 'Teacher' } });
  expect(screen.getByLabelText('Teacher Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Subject')).toBeInTheDocument();
  expect(screen.queryByLabelText('Student Name')).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('User Type'), { target: { value: 'Student' } });
  fireEvent.change(screen.getByLabelText('Student Name'), { target: { value: 'Demo Student' } });
  fireEvent.change(screen.getByLabelText('Class'), { target: { value: 'B' } });
  fireEvent.change(screen.getByLabelText('Std'), { target: { value: '8th' } });
  fireEvent.change(screen.getByLabelText('DOB'), { target: { value: '2008-05-12' } });
  fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'Female' } });
  fireEvent.change(screen.getByLabelText('Parent/Guardian Name'), { target: { value: 'Asha Student' } });
  fireEvent.change(screen.getByLabelText('Mobile No.'), { target: { value: '9876543210' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));

  expect(screen.getByText('Demo Student')).toBeInTheDocument();
  expect(screen.getByLabelText('9 total users: 9 students, 0 teachers, 0 other users')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Edit Demo Student' }));
  expect(screen.getByRole('heading', { name: 'Edit User' })).toBeInTheDocument();
  expect(screen.getByLabelText('Student Name')).toHaveValue('Demo Student');
  expect(screen.getByLabelText('Parent/Guardian Name')).toHaveValue('Asha Student');
  expect(screen.getByLabelText('Std')).toHaveValue('8th');

  fireEvent.change(screen.getByLabelText('Student Name'), { target: { value: 'Updated Student' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
  expect(screen.getByText('Updated Student')).toBeInTheDocument();
  expect(screen.queryByText('Demo Student')).not.toBeInTheDocument();
});

test('updates the subject chart when a teacher is added', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  fireEvent.change(screen.getByLabelText('User Type'), { target: { value: 'Teacher' } });
  fireEvent.change(screen.getByLabelText('Teacher Name'), { target: { value: 'Riya Teacher' } });
  fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Tamil' } });
  fireEvent.change(screen.getByLabelText('DOB'), { target: { value: '1990-04-20' } });
  fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'Female' } });
  fireEvent.change(screen.getByLabelText('Mobile No.'), { target: { value: '9876543210' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));

  expect(screen.getByLabelText('9 total users: 8 students, 1 teachers, 0 other users')).toBeInTheDocument();
  expect(screen.getByLabelText('Teacher subject counts: Tamil 1, English 0, maths 0, Science 0, Social 0')).toBeInTheDocument();
});

test('requires confirmation before deleting a user', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Delete Trisha Suresh' }));
  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByRole('alertdialog')).toHaveTextContent(/Delete Trisha Suresh\?/);

  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.getByText('Trisha Suresh')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Delete Trisha Suresh' }));
  fireEvent.click(screen.getByRole('button', { name: 'Delete', exact: true }));
  expect(screen.queryByText('Trisha Suresh')).not.toBeInTheDocument();
  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});
