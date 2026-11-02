import React, { type CSSProperties, type StyleHTMLAttributes } from 'react';
import { useNavigate } from 'react-router';
import { useLayout } from '~/contexts/layout';
import { SidebarNav } from '~/components/layout/SidebarNav';
import { AppHeader } from '~/components/chat/ChatHeader';

export interface LayoutProps {
  title?: string;
  onSelectHome?: () => void;
  onBack?: () => void;
  onOpenProfile?: () => void;
  onNavigateContacts?: () => void;
  onToggleMenu?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Layout({
  title,
  onSelectHome,
  onBack,
  onOpenProfile,
  onNavigateContacts,
  onToggleMenu,
  children,
  className,
  style
}: LayoutProps) {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    selected,
    setSelected,
    query,
    setQuery,
    myProfilePop,
    setMyProfilePop,
  } = useLayout();
  const navigate = useNavigate();

  return (
    <div style={style} className={`flex h-screen w-full bg-app-bg-alt overflow-hidden relative ${className}`}>
      <SidebarNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectHome={() => {
          setSelected(null);
          setIsSidebarOpen(false);
          onSelectHome?.();
        }}
        myProfilePop={myProfilePop}
        setMyProfilePop={setMyProfilePop}
        onNavigate={navigate}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        <AppHeader
          selected={selected}
          query={query}
          title={title ?? ''}
          onQueryChange={setQuery}
          onBack={() => {
            setSelected(null);
            onBack?.();
          }}
          onOpenProfile={() => {
            setMyProfilePop(true);
            onOpenProfile?.();
          }}
          onNavigateContacts={
            onNavigateContacts ?? (() => navigate('/contacts'))
          }
          onToggleMenu={
            onToggleMenu ??
            (() => {
              if (!selected) {
                setIsSidebarOpen(true);
              }
            })
          }
        />
        {children}
      </div>
    </div>
  );
}
