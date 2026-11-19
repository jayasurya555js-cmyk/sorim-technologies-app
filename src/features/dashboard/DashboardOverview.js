import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import subjects from './data/subjects';

function UsersChart({ users }) {
    const counts = [
        { name: 'Student', type: 'Student', color: '#ffc16f' },
        { name: 'Teachers', type: 'Teacher', color: '#e86a00' },
        { name: 'Others', type: 'Other', color: '#98a3b8' },
    ].map((group) => ({
        ...group,
        value: users.filter((user) => (user.type || 'Student') === group.type).length,
    }));
    const totalUsers = users.length;
    const studentCount = counts.find((group) => group.type === 'Student').value;
    const teacherCount = counts.find((group) => group.type === 'Teacher').value;
    const otherCount = counts.find((group) => group.type === 'Other').value;
    const distribution = totalUsers ? counts : [{ name: 'No users', value: 1, color: '#e7e9ef' }];

    return (
        <section className="chart-card users-chart" aria-labelledby="overall-title">
            <h2 id="overall-title">Overall Users</h2>
            <div className="users-chart-content">
                <div className="donut-wrap" role="img" aria-label={`${totalUsers} total users: ${studentCount} students, ${teacherCount} teachers, ${otherCount} other users`}>
                    <ResponsiveContainer className="users-pie-chart" width="100%" height="100%">
                        <PieChart>
                            <Pie data={distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="58%" outerRadius="84%" startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
                                {distribution.map((user) => <Cell key={user.name} fill={user.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="donut-center"><strong>{totalUsers}</strong><span>Users</span></div>
                </div>
                <ul className="chart-legend user-legend">
                    {counts.map((group) => <li key={group.type}><i className="legend-dot" style={{ backgroundColor: group.color }} />{group.name} <span>({group.value})</span></li>)}
                </ul>
            </div>
        </section>
    );
}

function SubjectChart({ users }) {
    const subjectCounts = subjects.map((subject) => ({
        ...subject,
        count: users.filter((user) => user.type === 'Teacher' && (user.subject || user.className) === subject.name).length,
    }));
    const subjectsWithCounts = subjectCounts
        .filter((subject) => subject.count > 0)
        .map((subject) => ({ name: subject.name, value: subject.count, color: subject.fill }));
    const chartData = subjectsWithCounts.length ? subjectsWithCounts : [{ name: 'No staff', value: 1, color: '#e7e9ef' }];
    const accessibleCounts = subjectCounts.map((subject) => `${subject.name} ${subject.count}`).join(', ');

    return (
        <section className="chart-card subject-chart" aria-labelledby="subject-title">
            <h2 id="subject-title">Staff Count - Subject</h2>
            <div className="subject-chart-content">
                <div className="subject-pie" role="img" aria-label={`Teacher subject counts: ${accessibleCounts}`}>
                    <ResponsiveContainer className="subject-pie-chart" width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="100%" stroke="none" isAnimationActive={false}>
                                {chartData.map((subject) => <Cell key={subject.name} fill={subject.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <ul className="chart-legend subject-legend">
                    {subjectCounts.map((subject) => <li key={subject.name}><i className="legend-dot" style={{ backgroundColor: subject.fill }} />{subject.name} <span>({subject.count})</span></li>)}
                </ul>
            </div>
        </section>
    );
}

function PassChart() {
    const [period, setPeriod] = useState('Half-yearly - 2026');
    const values = [78, 45, 38, 57, 66, 30, 30, 43, 20, 30, 30, 38];
    const points = values.map((value, index) => `${48 + index * 44},${210 - value * 1.65}`).join(' ');

    return (
        <section className="chart-card pass-chart" aria-labelledby="pass-title">
            <div className="pass-chart-heading">
                <h2 id="pass-title">Pass Percentage</h2>
                <label className="visually-hidden" htmlFor="period-select">Report period</label>
                <select id="period-select" value={period} onChange={(event) => setPeriod(event.target.value)}>
                    <option>Half-yearly - 2026</option><option>Quarterly - 2026</option><option>Annual - 2026</option>
                </select>
            </div>
            <div className="pass-chart-body">
                <svg className="pass-graph" viewBox="0 0 560 270" role="img" aria-label="Pass percentage by month, ranging from 20 to 78 percent">
                    {[0, 20, 40, 60, 80, 100].map((tick) => {
                        const y = 210 - tick * 1.65;
                        return <g key={tick}><line className="gridline" x1="42" y1={y} x2="540" y2={y} /><text className="axis-label" x="3" y={y + 4}>{tick === 0 ? '0' : `${tick}%`}</text></g>;
                    })}
                    <polyline className="pass-line" points={points} />
                    {values.map((value, index) => <circle key={index} className="pass-point" cx={48 + index * 44} cy={210 - value * 1.65} r="6" />)}
                    {values.map((_, index) => <text key={index} className="month-label" x={48 + index * 44} y="240">{index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}</text>)}
                </svg>
            </div>
        </section>
    );
}

function DashboardOverview({ users }) {
    return <div className="overview-grid"><UsersChart users={users} /><SubjectChart users={users} /><PassChart /></div>;
}

export default DashboardOverview;