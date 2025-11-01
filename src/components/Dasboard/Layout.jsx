import Sidebar from "./SideMenu";
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = ({ children }) => {
    useEffect(() => {
        // Only activate back-blocking when there's an access token (user is logged in)
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        // Push a dummy state so there's something to stay on when Back is pressed
        const pushState = () => window.history.pushState(null, '', window.location.href);
        // run once immediately
        pushState();

        const onPopState = () => {
            // Prevent navigating back by pushing the state again
            pushState();
        };

        window.addEventListener('popstate', onPopState);

        return () => {
            window.removeEventListener('popstate', onPopState);
        };
    }, []);

    return (
        <div className="flex h-screen bg-[#16151C] overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-auto p-6">
                    {/* Render children when passed directly, otherwise render nested routes via Outlet */}
                    {children ? children : <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default Layout;
