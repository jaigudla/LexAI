import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, FileText } from 'lucide-react';

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex h-screen bg-background text-text">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <div className="container py-8">
                    {children || <Outlet />}
                </div>
            </main>
        </div>
    );
};

import { Outlet } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Upload, label: 'Upload Document', path: '/upload' },
    ];

    return (
        <aside className="w-64 border-r border-border bg-surface flex flex-col">
            <div className="p-6 border-b border-border flex items-center gap-3">
                <FileText className="text-primary w-8 h-8" />
                <span className="text-xl font-bold">LexAI</span>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary bg-opacity-10'
                                    : 'text-text-secondary hover:bg-surface-hover hover:text-text'
                                }`}
                            style={{ backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : undefined }}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Layout;
