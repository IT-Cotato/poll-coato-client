import { PATH } from '@/route/path';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import logo from '@/assets/감직이.svg';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { href: PATH.HOME, label: '홈' },
    { href: PATH.ADMIN, label: '관리자' },
    { href: PATH.VOTE, label: '투표' },
    { href: PATH.RESULT, label: '결과' },
  ];
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={PATH.HOME} className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 p-1" />
            </div>
            <h1 className="text-2xl font-bold text-secondary">POLLTATO</h1>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors hover:text-secondary ${
                  location.pathname === item.href
                    ? 'text-secondary'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`text-lg transition-colors hover:text-secondary ${
                        location.pathname === item.href
                          ? 'text-secondary'
                          : 'text-slate-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
