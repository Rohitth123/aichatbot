'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatSession, Message } from '@/lib/types';
import { storage } from '@/lib/storage';

interface ChatContextType {
  sessions: ChatSession[];
  activeSessionId: string | null;
  activeSession: ChatSession | null;
  loading: boolean;
  error: string | null;
  createSession: () => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  switchSession: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  downloadSession: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedSessions = storage.getSessions();
    const savedActiveId = storage.getActiveSessionId();
    setSessions(savedSessions);
    if (savedSessions.length === 0) {
      const defaultSession: ChatSession = {
        id: Date.now().toString(),
        title: 'Welcome Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setSessions([defaultSession]);
      setActiveSessionId(defaultSession.id);
      storage.setSessions([defaultSession]);
      storage.setActiveSessionId(defaultSession.id);
    } else {
      setActiveSessionId(savedActiveId || (savedSessions.length > 0 ? savedSessions[0].id : null));
    }
  }, []);

  useEffect(() => {
    storage.setSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    if (activeSessionId) {
      storage.setActiveSessionId(activeSessionId);
    }
  }, [activeSessionId]);

  const createSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${new Date().toLocaleDateString()}`,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSessions([...sessions, newSession]);
    setActiveSessionId(newSession.id);
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const renameSession = (id: string, title: string) => {
    setSessions(
      sessions.map(s => (s.id === id ? { ...s, title, updatedAt: Date.now() } : s))
    );
  };

  const switchSession = (id: string) => {
    setActiveSessionId(id);
    setError(null);
  };

  const sendMessage = async (content: string) => {
    if (!activeSessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setSessions(
      sessions.map(s =>
        s.id === activeSessionId
          ? { ...s, messages: [...s.messages, userMessage], updatedAt: Date.now() }
          : s
      )
    );

    setLoading(true);
    setError(null);

    try {
      const activeSession = sessions.find(s => s.id === activeSessionId);
      const messagesForApi = activeSession?.messages.map(m => ({
        role: m.role,
        content: m.content,
      })) || [];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messagesForApi, { role: 'user', content }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
      };

      setSessions(
        sessions.map(s =>
          s.id === activeSessionId
            ? { ...s, messages: [...s.messages, aiMessage], updatedAt: Date.now() }
            : s
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage === 'The operation was aborted.' ? 'Request timeout' : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const downloadSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (!session) return;

    const data = {
      id: session.id,
      title: session.title,
      createdAt: new Date(session.createdAt).toISOString(),
      updatedAt: new Date(session.updatedAt).toISOString(),
      messageCount: session.messages.length,
      messages: session.messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: new Date(m.timestamp).toISOString(),
      })),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.title.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const activeSession = sessions.find(s => s.id === activeSessionId) || null;

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeSessionId,
        activeSession,
        loading,
        error,
        createSession,
        deleteSession,
        renameSession,
        switchSession,
        sendMessage,
        downloadSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
