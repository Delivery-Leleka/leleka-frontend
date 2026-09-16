import React from 'react';
import { useNavigate } from 'react-router';
import { useMessenger } from '~/hooks/useMessenger';

import { SidebarNav } from '~/components/layout/SidebarNav';
import { ChatHeader } from '~/components/chat/ChatHeader';
import { ChatList } from '~/components/chat/ChatList';
import { MessageBubble } from '~/components/chat/MessageBubble';
import { MessageInput } from '~/components/chat/MessageInput';
import { UserProfileDrawer } from '~/components/chat/UserProfileDrawer';
import { ChatOptionsMenu } from '~/components/chat/ChatOptionsMenu';
import { DeleteModal } from '~/components/chat/DeleteModal';

export default function MessangerPage() {
  const navigate = useNavigate();
  const chat = useMessenger();

  return (
    <div className="flex h-screen w-full bg-app-bg-alt overflow-hidden relative">
      <SidebarNav
        isOpen={chat.isSidebarOpen}
        onClose={() => chat.setIsSidebarOpen(false)}
        onSelectHome={() => {
          chat.setSelected(null);
          chat.setIsSidebarOpen(false);
        }}
        myProfilePop={chat.myProfilePop}
        setMyProfilePop={chat.setMyProfilePop}
        onNavigate={navigate}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        <ChatHeader
          selected={chat.selected}
          query={chat.query}
          onQueryChange={chat.setQuery}
          onBack={() => chat.setSelected(null)}
          onOpenProfile={() => chat.setProfileOpen(true)}
          onNavigateContacts={() => navigate('/contacts')}
          onToggleMenu={() => {
            if (chat.selected) {
              chat.setDotsOpen(!chat.dotsOpen);
            } else {
              chat.setIsSidebarOpen(true);
            }
          }}
        />

        <div className="flex-1 flex overflow-hidden relative">
          <div
            className={`${chat.selected ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}
          >
            <ChatList
              items={chat.items}
              messages={chat.messages}
              onSelectChat={(item) => {
                chat.setSelected(item);
                chat.setDotsOpen(false);
              }}
            />
          </div>

          {chat.selected && (
            <div className="flex-1 flex flex-col bg-[var(--color-chat-bg)] h-full w-full">
              <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-3 max-w-4xl w-full mx-auto">
                {chat.messages[chat.selected.id]?.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
                <div ref={chat.chatBottomRef} />
              </div>

              <MessageInput
                inputText={chat.inputText}
                setInputText={chat.setInputText}
                onSend={chat.handleSendMessage}
              />
            </div>
          )}

          <UserProfileDrawer
            isOpen={chat.profileOpen}
            selectedUser={chat.selected}
            onClose={() => chat.setProfileOpen(false)}
          />
        </div>
      </div>

      {chat.selected && (
        <ChatOptionsMenu
          isOpen={chat.dotsOpen}
          onDeleteClick={() => {
            chat.setDotsOpen(false);
            chat.setDeleteModal(true);
          }}
        />
      )}

      {chat.deleteModal && (
        <DeleteModal
          onClose={() => chat.setDeleteModal(false)}
          onDelete={chat.handleDeleteChat}
        />
      )}
    </div>
  );
}
