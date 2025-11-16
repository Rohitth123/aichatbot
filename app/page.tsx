'use client';

import { ChatProvider } from '@/components/chat-context';
import { Sidebar } from '@/components/sidebar';
import { MessageList } from '@/components/message-list';
import { MessageInput } from '@/components/message-input';

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <MessageList />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  );
}
