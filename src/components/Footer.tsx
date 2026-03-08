import { Logo } from './Logo';
import { siteSettings } from '../data/globalData';

export function Footer() {
  const settings = siteSettings;

  const bgColor = 'bg-[#000000]';
  const textColor = 'text-white/70';
  const linkColor = 'text-white hover:text-[#3F4CCB]';
  const borderColor = 'border-white/10';

  return (
    <footer className={`w-full ${bgColor} border-t ${borderColor} py-8 px-6 lg:px-10 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left gap-4 md:gap-4 text-sm font-medium mt-auto`}>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-white">
        <Logo className="h-6 w-auto" />
        <span className={`${textColor}`}>
          &copy; {new Date().getFullYear()} {settings.companyName}. All rights reserved.
        </span>
      </div>
      <div className={`${textColor}`}>
        Designed and maintained by{' '}
        <a href={settings.designerUrl} target="_blank" rel="noopener noreferrer" className={`transition-colors font-bold ${linkColor}`}>
          {settings.designerName}
        </a>
      </div>
    </footer>
  );
}
