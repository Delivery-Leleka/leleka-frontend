import React, { useRef, type Dispatch, type RefObject, type SetStateAction } from 'react';
import {
  MessageSquareText as ChatIcon,
  User,
  Folders,
  SettingsIcon,
  Edit3,
  X,
  Phone,
  PlusCircle,
  Archive,
  Settings,
  Sun,
  LogOut,
} from 'lucide-react';
import { MY_PROFILE } from '~/components/chat/mockData';
import UserProfileModal from './UserProfileModal';
import { useNavigate } from 'react-router';
import { SidebarNavItem } from './SidebarNavItem';
import useClickOutside from '~/hooks/useClickOutside';

interface SidebarNavProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectHome: () => void;
  myProfilePop: boolean;
  setMyProfilePop: Dispatch<SetStateAction<boolean>>;
}

type SidebarNavButton = {
  ref?: RefObject<HTMLButtonElement | null>;
  icon: React.ComponentType<{ className: string; }>;
  title: string;
  path: string;
  className?: string;
};

export const SidebarNav: React.FC<SidebarNavProps> = ({
  isOpen = false,
  onClose,
  onSelectHome,
  myProfilePop,
  setMyProfilePop,
}) => {
  const navigate = useNavigate();

    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLButtonElement>(null);
    useClickOutside(
        modalRef, 
        () => {setMyProfilePop(false)},
        [profileRef],
    );

  const navButtons: SidebarNavButton[] = [
  {
    icon: User,
    title: 'Профіль',
    path: '/profile',
  },
  {
    icon: Phone,
    title: 'Контакти',
    path: '/contacts',
  },
  {
    icon: PlusCircle,
    title: 'Створити групу',
    path: '/createGroup',
  },
  {
    icon: Folders,
    title: 'Приватна папка',
    path: '/privateFolder',
  },
  {
    icon: Archive,
    title: 'Архів',
    path: '/archive',
  },
  {
    icon: Settings,
    title: 'Налаштування',
    path: '/settings',
  },
  {
    icon: Sun,
    title: 'Світла/Темна тема',
    path: '/theme',
  },
  {
    icon: LogOut,
    title: 'Вийти з акаунту',
    path: '/logout',
  },
];


  const handleButtonClick = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 h-full w-[280px] md:w-[100px] bg-brand-100 
          flex flex-col justify-between items-center pt-6 md:pt-[34px] pb-8 shrink-0 z-50 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="w-full px-6 flex items-center justify-between md:justify-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-[89px] h-[59px] cursor-pointer object-contain"
            onClick={() => {
              onSelectHome();
              onClose?.();
            }}
          />
          <button
            onClick={onClose}
            className="md:hidden p-2 text-brand-800 hover:bg-brand-200/50 rounded-xl transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center my-3 gap-4 md:gap-[35px] relative w-full px-4 md:px-0">
          <button
            ref={profileRef}
            onClick={() => setMyProfilePop(!myProfilePop)}
            className="burger-menu-item"
            title="Мій профіль"
          >
            <div className='w-12 h-12 rounded-full bg-white text-brand-800 font-bold flex items-center justify-center shadow-sm hover:scale-105 transition border border-brand-50 cursor-pointer shrink-0'>{MY_PROFILE.avatar}</div>
            <span className='font-bold text-xl md:hidden'>{MY_PROFILE.name}</span>
          </button>

          <UserProfileModal 
          ref={modalRef}
          isProfileModalVisible={myProfilePop} 
          setIsProfileModalVisible={setMyProfilePop}
          profile={MY_PROFILE}
          onClose={onClose}
           />

          <div className="flex flex-col items-center gap-4 md:gap-[55px] w-full px-4 md:px-0">
            {navButtons.map((button, index) => (
              <SidebarNavItem
                key={index}
                icon={button.icon}
                title={button.title}
                onClick={() => handleButtonClick(button.path)}
                className="burger-menu-item"
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};