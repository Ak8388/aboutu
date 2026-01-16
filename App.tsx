
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Dashboard from './components/Dashboard';
import RoleSelector from './components/RoleSelector';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Persistence for the demo environment
  useEffect(() => {
    const savedRole = localStorage.getItem('user_role');
    if (savedRole && Object.values(UserRole).includes(savedRole as UserRole)) {
      setUserRole(savedRole as UserRole);
    }
  }, []);

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('user_role', role);
  };

  const handleReset = () => {
    setUserRole(null);
    localStorage.removeItem('user_role');
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      {!userRole ? (
        <RoleSelector onSelect={handleSelectRole} />
      ) : (
        <Dashboard role={userRole} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
