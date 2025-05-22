'use client';

import { useState, useEffect } from 'react';
import { UserAvatar } from './UserAvatar';
import LogoZara from '../LogoZara';

export const Header = () => {
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <LogoZara className="w-32 text-black dark:text-white" />
        <UserAvatar newNotification={newNotification} />
      </div>
    </>
  );
};
