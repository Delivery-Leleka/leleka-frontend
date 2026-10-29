import { useState, useRef, useEffect } from 'react';
import type { ChatItem, ExtendedMessage } from '~/types';
import { INITIAL_CHATS, INITIAL_MESSAGES } from '~/components/chat/mockData';

export function useMessenger() {
  const [items, setItems] = useState<ChatItem[]>(INITIAL_CHATS);
  const [messages, setMessages] =
    useState<Record<string, ExtendedMessage[]>>(INITIAL_MESSAGES);
  const [selected, setSelected] = useState<ChatItem | null>(null);
  const [query, setQuery] = useState('');
  const [inputText, setInputText] = useState('');

  // Меню та модальні вікна
  const [dotsOpen, setDotsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false); // 👈 Додано стан для модалки блокування
  const [myProfilePop, setMyProfilePop] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = items.filter((it) =>
    it.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selected || !inputText.trim()) return;

    const newMsg: ExtendedMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString().slice(0, 5),
      read: false,
    };

    setMessages((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));

    setInputText('');
  };

  // Видалення чату
  const handleDeleteChat = () => {
    if (!selected) return;
    setItems((prev) => prev.filter((item) => item.id !== selected.id));
    setSelected(null);
    setDeleteModal(false);
  };

  // Блокування користувача
  const handleBlockUser = () => {
    if (!selected) return;
    // Тимчасово оновлюємо статус або робимо потрібну логіку блокування
    setItems((prev) =>
      prev.map((item) =>
        item.id === selected.id ? { ...item, isBlocked: true } : item
      )
    );
    setBlockModal(false);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selected]);

  return {
    items: filteredItems,
    messages,
    selected,
    setSelected,
    query,
    setQuery,
    inputText,
    setInputText,
    dotsOpen,
    setDotsOpen,
    deleteModal,
    setDeleteModal,
    blockModal,
    setBlockModal,
    myProfilePop,
    setMyProfilePop,
    profileOpen,
    setProfileOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    chatBottomRef,
    handleSendMessage,
    handleDeleteChat,
    handleBlockUser,
  };
}
