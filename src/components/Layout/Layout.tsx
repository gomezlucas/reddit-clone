import React from 'react';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
    children: React.ReactNode;
  }
  
const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <main>
            < Navbar />
            {children}
        </main>)
}
export default Layout;