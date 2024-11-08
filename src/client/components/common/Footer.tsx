import { FC } from "react";
import { Kaushan_Script } from 'next/font/google';
import { Special_Elite } from 'next/font/google';

const specialElite = Special_Elite({
  weight: '400', // You can specify the weight if needed
  subsets: ['latin'], // Define the subsets you need
});

const kaushan = Kaushan_Script({
  weight: '400', // You can specify the weight if needed
  subsets: ['latin'], // Define the subsets you need
});

/*
https://github.com/frantisekpetko/zoo-admin-v2/blob/main/frontend/src/components/common/Footer.tsx
*/

const Footer: FC<{}> = () => {
    return (
        <footer className={`
            ${specialElite.className}
            border-t 
            border-gray-400 
            w-full 
            bg-darkolivegreen 
            h-auto 
            text-white 
            font-bold 
            flex-shrink-0 
            text-center 
            py-4 
            hover:bg-green-400 
            hover:text-black 
            hover:border-black
            transition 
            ease-in-out
            duration-700 
        `}>
            <div className={`
    
            `}>
                Copyright&copy; {new Date().getFullYear()} Zoo Admin
            </div>
            <div className={`
                ${kaushan.className}
                text-2xl 
                mb-1 
                px-2 
                max-w-full 
            `}>
                Created by František Petko
            </div>
            <div className={`
                ${specialElite.className}
                font-display-swap 
                px-2 
            `}>
                Powered by NodeJS, NestJS, ReactJS, MUI and my skills.
            </div>
        </footer>
    );
};

export default Footer;

