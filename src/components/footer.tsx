import { GithubIcon, Globe, LinkedinIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const socials = [
    {
      name: 'Github',
      icon: GithubIcon,
      link: 'https://github.com/floating-dynamo',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      link: 'https://www.linkedin.com/in/sridhar-maskeri/',
    },
    {
      name: 'Twitter',
      icon: TwitterIcon,
      link: 'https://x.com/sridharmaskeri',
    },
    {
      name: 'Portfolio Website',
      icon: Globe,
      link: 'https://portfolio-sridhar-maskeris-projects.vercel.app/',
    },
  ];

  return (
    <footer className="font-sans font-bold flex-wrap tracking-tighter flex flex-col gap-1 items-center justify-center bg-slate-900 text-white py-4 mt-4">
      <p>Made by Sridhar Maskeri</p>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {socials.map(({ icon: Icon, link, name }) => (
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            key={name}
            href={link}
            aria-label={name}
          >
            <Icon className="size-5" />
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
