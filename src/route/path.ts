export const PATH = {
  HOME: '/',
  POLL: '/poll',
  VOTE: '/vote',
  RESULT: '/result',
  ADMIN: '/admin',
};

export const API_PATH = {
  LOGIN: '/team-users/me',
  USER_VOTE: '/polls/:pollId/items/vote',
  POLL_ITEMS: '/polls/:pollId/items/group/member',
  ADMIN_CONTROL: '/workspaces/:workspaceId/polls/:pollId/status',
};

export const QUERY_KEY = {
  LOGIN: 'login',
  USER_VOTE: 'user-vote',
  POLL_ITEMS: 'poll-items',
  ADMIN_CONTROL: 'admin-control',
};
