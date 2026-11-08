import React from 'react';
import { useNavigate } from 'react-router';
import { useMessenger } from '~/hooks/useMessenger';

import { Layout } from '~/routes/layouts/layout';
import { ChatList } from '~/components/chat/ChatList';
import { MessageBubble } from '~/components/chat/MessageBubble';
import { MessageInput } from '~/components/chat/MessageInput';
import { UserProfileDrawer } from '~/components/chat/UserProfileDrawer';
import { ChatOptionsMenu } from '~/components/chat/ChatOptionsMenu';
import { DeleteModal } from '~/components/chat/DeleteModal';
import { BlockUserModal } from '~/components/chat/BlockUserModal';

export default function MessangerPage() {
  const navigate = useNavigate();
  const chat = useMessenger();

  return (
    <Layout
      title="Лелека"
      onNavigateContacts={() => navigate('/contacts')}
      onToggleMenu={() => {
        if (chat.selected) {
          chat.setDotsOpen(!chat.dotsOpen);
        }
      }}
    >
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
            <div className="p-4 bg-white border-b border-brand-50 flex items-center justify-between shadow-sm">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => chat.setProfileOpen(true)}
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-850 overflow-hidden">
                  {chat.selected.avatar ? (
                    <img
                      src={chat.selected.avatar}
                      alt={chat.selected.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    chat.selected.name[0] || 'U'
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    {chat.selected.name}
                  </h3>
                  <p className="text-xs text-brand-700">
                    {chat.selected.status || 'В мережі'}
                  </p>
                </div>
              </div>
            </div>

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

      {chat.selected && (
        <ChatOptionsMenu
          isOpen={chat.dotsOpen}
          isBlocked={chat.selected.isBlocked}
          onBlockClick={() => {
            chat.setDotsOpen(false);
            chat.setBlockModal(true);
          }}
          onDeleteClick={() => {
            chat.setDotsOpen(false);
            chat.setDeleteModal(true);
          }}
        />
      )}

      <DeleteModal
        isOpen={chat.deleteModal}
        onClose={() => chat.setDeleteModal(false)}
        onConfirm={chat.handleDeleteChat}
      />

      <BlockUserModal
        isOpen={chat.blockModal}
        userName={chat.selected?.name}
        onClose={() => chat.setBlockModal(false)}
        onConfirm={chat.handleBlockUser}
      />
    </Layout>
  );
}