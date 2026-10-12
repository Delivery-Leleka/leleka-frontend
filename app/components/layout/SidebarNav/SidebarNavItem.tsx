import React from 'react';

type SidebarNavItemProps = {
  icon: React.ComponentType<{ className: string; }>;
  title: string;
  onClick: () => void;
  className?: string;
};

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon: Icon,
  title,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`burger-menu-item ${className}`}
      title={title}
    >
      <Icon className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
      <span className={'font-medium text-base md:hidden'}>{title}</span>
    </button>
  );
};