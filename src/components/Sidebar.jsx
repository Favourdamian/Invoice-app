import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/images/Group 9.png';
import avatarImg from '../assets/images/Oval.png';
import './Sidebar.css';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logoImg} alt="Logo" className="logo-icon" />
      </div>

      <div className="sidebar-bottom">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? (
            <Moon className="theme-icon" size={20} fill="#7E88C3" color="#7E88C3" />
          ) : (
            <Sun className="theme-icon" size={20} fill="#888EB0" color="#888EB0" />
          )}
        </button>
        <div className="divider"></div>
        <div className="avatar-container">
          <img src={avatarImg} alt="User Avatar" className="avatar" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
