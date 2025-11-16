'use client';

import { useChat } from './chat-context';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MessageInput() {
  const { activeSessionId, loading, error, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeSessionId || loading) return;

    await sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {error && (
        <div className="mb-3 p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex justify-between items-center">
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line, Enter to send)"
          disabled={!activeSessionId || loading}
          className="flex-1 resize-none p-3 bg-background text-foreground border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          rows={3}
        />
        <Button
          type="submit"
          disabled={!activeSessionId || loading || !input.trim()}
          className="self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
