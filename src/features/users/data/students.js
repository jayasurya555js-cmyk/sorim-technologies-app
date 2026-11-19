const students = [
    { admission: 'SIS-053', name: 'Trisha Suresh', className: '8th - A', dob: '25-07-2005', gender: 'Female', parent: 'Kirti Arvind Bail', mobile: '9988776655' },
    { admission: 'SIS-054', name: 'Aarav Kumar', className: '8th - A', dob: '14-03-2006', gender: 'Male', parent: 'Meena Kumar', mobile: '9876543210' },
    { admission: 'SIS-055', name: 'Nisha Patel', className: '7th - B', dob: '09-11-2006', gender: 'Female', parent: 'Raj Patel', mobile: '9876501234' },
    { admission: 'SIS-056', name: 'Dev Sharma', className: '9th - A', dob: '02-02-2005', gender: 'Male', parent: 'Anita Sharma', mobile: '9865432109' },
    { admission: 'SIS-057', name: 'Maya Thomas', className: '8th - B', dob: '18-08-2006', gender: 'Female', parent: 'Joseph Thomas', mobile: '9890123456' },
    { admission: 'SIS-058', name: 'Rohan Das', className: '7th - A', dob: '30-01-2007', gender: 'Male', parent: 'Sonia Das', mobile: '9845012345' },
    { admission: 'SIS-059', name: 'Anika Roy', className: '9th - B', dob: '12-06-2005', gender: 'Female', parent: 'Arun Roy', mobile: '9812345670' },
    { admission: 'SIS-060', name: 'Ishan Rao', className: '8th - A', dob: '21-12-2006', gender: 'Male', parent: 'Kavya Rao', mobile: '9801234567' },
].map((student) => ({ ...student, type: 'Student' }));

export default students;