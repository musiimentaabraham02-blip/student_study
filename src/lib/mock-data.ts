export interface User {
  id: string;
  name: string;
  email: string;
  program: string;
  yearOfStudy: number;
  avatar?: string;
  role: 'student' | 'admin';
}

export interface StudyGroup {
  id: string;
  name: string;
  courseCode: string;
  courseName: string;
  description: string;
  meetingLocation: string;
  leaderId: string;
  leaderName: string;
  memberCount: number;
  maxMembers: number;
  faculty: string;
  createdAt: string;
  tags: string[];
}

export interface StudySession {
  id: string;
  groupId: string;
  groupName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
}

export interface GroupPost {
  id: string;
  groupId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  type: 'announcement' | 'question' | 'general';
}

export const currentUser: User = {
  id: 'u1',
  name: 'John Mukasa',
  email: 'john.mukasa@ucu.ac.ug',
  program: 'BSc Information Technology',
  yearOfStudy: 2,
  role: 'student',
};

export const studyGroups: StudyGroup[] = [
  {
    id: 'g1',
    name: 'Web Dev Warriors',
    courseCode: 'CSC1202',
    courseName: 'Web & Mobile App Development',
    description: 'Collaborative study group focusing on React, Node.js, and full-stack web development projects.',
    meetingLocation: 'Library Room 204',
    leaderId: 'u1',
    leaderName: 'John Mukasa',
    memberCount: 12,
    maxMembers: 20,
    faculty: 'Engineering, Design & Technology',
    createdAt: '2026-03-15',
    tags: ['React', 'Node.js', 'Web Dev'],
  },
  {
    id: 'g2',
    name: 'Data Structures Study Circle',
    courseCode: 'CSC1201',
    courseName: 'Data Structures & Algorithms',
    description: 'Deep dive into algorithms, sorting, trees, graphs, and competitive programming preparation.',
    meetingLocation: 'Computer Lab 3',
    leaderId: 'u2',
    leaderName: 'Sarah Namuli',
    memberCount: 18,
    maxMembers: 25,
    faculty: 'Engineering, Design & Technology',
    createdAt: '2026-02-20',
    tags: ['Algorithms', 'Python', 'Competitive'],
  },
  {
    id: 'g3',
    name: 'Database Design Hub',
    courseCode: 'CSC1203',
    courseName: 'Database Systems',
    description: 'Master SQL, normalization, ER diagrams, and database administration together.',
    meetingLocation: 'Online - Zoom',
    leaderId: 'u3',
    leaderName: 'Peter Ochieng',
    memberCount: 8,
    maxMembers: 15,
    faculty: 'Engineering, Design & Technology',
    createdAt: '2026-03-01',
    tags: ['SQL', 'PostgreSQL', 'Design'],
  },
  {
    id: 'g4',
    name: 'Stats & Probability Crew',
    courseCode: 'MAT2101',
    courseName: 'Statistics & Probability',
    description: 'Working through probability distributions, hypothesis testing, and statistical analysis.',
    meetingLocation: 'Science Block Room 105',
    leaderId: 'u4',
    leaderName: 'Grace Achieng',
    memberCount: 15,
    maxMembers: 20,
    faculty: 'Science',
    createdAt: '2026-03-10',
    tags: ['Statistics', 'Math', 'Analysis'],
  },
  {
    id: 'g5',
    name: 'Networking Ninjas',
    courseCode: 'CSC2301',
    courseName: 'Computer Networks',
    description: 'Study TCP/IP, network protocols, subnetting, and prepare for CCNA certification.',
    meetingLocation: 'Engineering Lab 2',
    leaderId: 'u5',
    leaderName: 'David Ssemakula',
    memberCount: 10,
    maxMembers: 15,
    faculty: 'Engineering, Design & Technology',
    createdAt: '2026-03-20',
    tags: ['Networks', 'CCNA', 'Protocols'],
  },
  {
    id: 'g6',
    name: 'AI & Machine Learning',
    courseCode: 'CSC3201',
    courseName: 'Artificial Intelligence',
    description: 'Explore machine learning algorithms, neural networks, and practical AI applications.',
    meetingLocation: 'Online - Google Meet',
    leaderId: 'u6',
    leaderName: 'Faith Nakato',
    memberCount: 22,
    maxMembers: 30,
    faculty: 'Engineering, Design & Technology',
    createdAt: '2026-02-28',
    tags: ['AI', 'ML', 'Python'],
  },
];

export const studySessions: StudySession[] = [
  {
    id: 's1',
    groupId: 'g1',
    groupName: 'Web Dev Warriors',
    date: '2026-04-15',
    time: '14:00',
    location: 'Library Room 204',
    description: 'React Hooks deep dive and practice session',
    attendees: 8,
  },
  {
    id: 's2',
    groupId: 'g1',
    groupName: 'Web Dev Warriors',
    date: '2026-04-18',
    time: '10:00',
    location: 'Library Room 204',
    description: 'REST API design and Node.js backend workshop',
    attendees: 10,
  },
  {
    id: 's3',
    groupId: 'g2',
    groupName: 'Data Structures Study Circle',
    date: '2026-04-16',
    time: '15:00',
    location: 'Computer Lab 3',
    description: 'Graph algorithms - BFS, DFS, and shortest paths',
    attendees: 14,
  },
  {
    id: 's4',
    groupId: 'g3',
    groupName: 'Database Design Hub',
    date: '2026-04-17',
    time: '18:00',
    location: 'Online - Zoom',
    description: 'Normalization practice and ER diagram review',
    attendees: 6,
  },
  {
    id: 's5',
    groupId: 'g6',
    groupName: 'AI & Machine Learning',
    date: '2026-04-19',
    time: '11:00',
    location: 'Online - Google Meet',
    description: 'Introduction to Neural Networks with TensorFlow',
    attendees: 18,
  },
];

export const groupPosts: GroupPost[] = [
  {
    id: 'p1',
    groupId: 'g1',
    authorName: 'John Mukasa',
    content: 'Hey everyone! Our next session will focus on React Hooks. Please review useState and useEffect before coming.',
    createdAt: '2026-04-13T10:30:00',
    type: 'announcement',
  },
  {
    id: 'p2',
    groupId: 'g1',
    authorName: 'Sarah Namuli',
    content: 'Can someone explain the difference between useCallback and useMemo? I keep mixing them up.',
    createdAt: '2026-04-13T11:15:00',
    type: 'question',
  },
  {
    id: 'p3',
    groupId: 'g1',
    authorName: 'Peter Ochieng',
    content: 'Great session yesterday! The REST API examples were really helpful for our project.',
    createdAt: '2026-04-12T16:00:00',
    type: 'general',
  },
  {
    id: 'p4',
    groupId: 'g1',
    authorName: 'John Mukasa',
    content: 'Reminder: Submit your individual project milestones by Friday. Let me know if anyone needs help.',
    createdAt: '2026-04-11T09:00:00',
    type: 'announcement',
  },
];

export const adminStats = {
  totalUsers: 245,
  totalGroups: 38,
  activeSessions: 12,
  mostActiveCourses: [
    { course: 'CSC1202 - Web & Mobile Dev', groups: 8, members: 95 },
    { course: 'CSC1201 - Data Structures', groups: 6, members: 78 },
    { course: 'CSC3201 - AI', groups: 5, members: 62 },
    { course: 'MAT2101 - Statistics', groups: 4, members: 48 },
    { course: 'CSC2301 - Networks', groups: 3, members: 35 },
  ],
};
