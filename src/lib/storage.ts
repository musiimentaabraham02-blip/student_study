import { User, StudyGroup, StudySession, GroupPost, studyGroups as initialGroups, studySessions as initialSessions, groupPosts as initialPosts } from './mock-data';

// Key names for local storage
const KEYS = {
  GROUPS: 'study_finder_groups',
  SESSIONS: 'study_finder_sessions',
  POSTS: 'study_finder_posts',
  USERS: 'study_finder_users',
};

// Initialization helper
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.GROUPS)) {
    localStorage.setItem(KEYS.GROUPS, JSON.stringify(initialGroups));
  }
  if (!localStorage.getItem(KEYS.SESSIONS)) {
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(initialSessions));
  }
  if (!localStorage.getItem(KEYS.POSTS)) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(initialPosts));
  }
};

// Groups
export const getGroups = (): StudyGroup[] => {
  return JSON.parse(localStorage.getItem(KEYS.GROUPS) || '[]');
};

export const saveGroup = (group: StudyGroup) => {
  const groups = getGroups();
  const index = groups.findIndex(g => g.id === group.id);
  if (index >= 0) {
    groups[index] = group;
  } else {
    groups.push(group);
  }
  localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
};

export const deleteGroup = (id: string) => {
  const groups = getGroups().filter(g => g.id !== id);
  localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
};

// Sessions
export const getSessions = (groupId?: string): StudySession[] => {
  const all = JSON.parse(localStorage.getItem(KEYS.SESSIONS) || '[]');
  return groupId ? all.filter((s: StudySession) => s.groupId === groupId) : all;
};

export const saveSession = (session: StudySession) => {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
};

// Posts
export const getPosts = (groupId: string): GroupPost[] => {
  const all = JSON.parse(localStorage.getItem(KEYS.POSTS) || '[]');
  return all.filter((p: GroupPost) => p.groupId === groupId);
};

export const savePost = (post: GroupPost) => {
  const posts = JSON.parse(localStorage.getItem(KEYS.POSTS) || '[]');
  posts.push(post);
  localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
};

// Analytics (Mocked based on stored data)
export const getStats = () => {
  const groups = getGroups();
  const sessions = getSessions();
  return {
    totalUsers: 245, // Static for now
    totalGroups: groups.length,
    activeSessions: sessions.length,
    mostActiveCourses: [
      { course: 'CSC1202 - Web & Mobile Dev', groups: 8, members: 95 },
      { course: 'CSC1201 - Data Structures', groups: 6, members: 78 },
    ]
  };
};
