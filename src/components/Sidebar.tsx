import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menuItems = [
  { label: 'Dashboard Ejecutivo', path: '/' },
  { label: 'Portafolio', path: '/portfolio' },
  { label: 'Presupuesto', path: '/budget' },
  { label: 'Capacity', path: '/capacity' },
  { label: 'Espacio PM', path: '/pm-space' },
  { label: 'Explorador PMO', path: '/explorer' },
  { label: 'Acerca del Portal', path: '/about' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>PMO Hub</h1>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={styles.menuItem}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <button className={styles.logoutButton}>
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
