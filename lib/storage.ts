import { ChatSession } from './types';

const SESSIONS_KEY = 'chat_sessions';
const ACTIVE_SESSION_KEY = 'active_session_id';

export const storage = {
  getSessions: (): ChatSession[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(SESSIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setSessions: (sessions: ChatSession[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  },

  getActiveSessionId: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACTIVE_SESSION_KEY);
  },

  setActiveSessionId: (id: string | null): void => {
    if (typeof window === 'undefined') return;
    if (id) {
      localStorage.setItem(ACTIVE_SESSION_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  },

  addSession: (session: ChatSession): void => {
    const sessions = storage.getSessions();
    sessions.push(session);
    storage.setSessions(sessions);
  },

  updateSession: (id: string, updates: Partial<ChatSession>): void => {
    const sessions = storage.getSessions();
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates, updatedAt: Date.now() };
      storage.setSessions(sessions);
    }
  },

  deleteSession: (id: string): void => {
    const sessions = storage.getSessions().filter(s => s.id !== id);
    storage.setSessions(sessions);
    if (storage.getActiveSessionId() === id) {
      storage.setActiveSessionId(null);
    }
  },

  renameSession: (id: string, title: string): void => {
    storage.updateSession(id, { title });
  },
};
