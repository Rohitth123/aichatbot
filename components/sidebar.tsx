'use client';

import { useChat } from './chat-context';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Edit2, Download } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function Sidebar() {
  const { sessions, activeSessionId, createSession, deleteSession, renameSession, switchSession, downloadSession } = useChat();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleRename = (id: string, currentTitle: string) => {
    setRenaming(id);
    setNewTitle(currentTitle);
  };

  const confirmRename = (id: string) => {
    if (newTitle.trim()) {
      renameSession(id, newTitle.trim());
    }
    setRenaming(null);
  };

  const sortedSessions = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-4 border-b border-sidebar-border">
        <Button onClick={createSession} className="w-full" variant="default">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          {sortedSessions.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No chats yet. Create one to get started!
            </div>
          ) : (
            sortedSessions.map(session => (
              <div
                key={session.id}
                className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                  activeSessionId === session.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'hover:bg-sidebar-accent/50'
                }`}
              >
                {renaming === session.id ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') confirmRename(session.id);
                        if (e.key === 'Escape') setRenaming(null);
                      }}
                      className="flex-1 bg-sidebar text-sidebar-foreground px-2 py-1 rounded text-sm"
                    />
                    <button
                      onClick={() => confirmRename(session.id)}
                      className="text-xs bg-sidebar-primary text-sidebar-primary-foreground px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => switchSession(session.id)}
                      className="truncate mb-2 font-medium"
                    >
                      {session.title}
                    </div>
                    <div className="text-xs opacity-75 mb-2">
                      {session.messages.length} messages
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(session.id, session.title);
                        }}
                        className="p-1 hover:bg-sidebar-primary/20 rounded"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadSession(session.id);
                        }}
                        className="p-1 hover:bg-sidebar-primary/20 rounded"
                        title="Download"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(session.id);
                        }}
                        className="p-1 hover:bg-destructive/20 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Chat</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat session and cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirm) deleteSession(deleteConfirm);
                setDeleteConfirm(null);
              }}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
