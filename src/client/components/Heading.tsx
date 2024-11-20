import { ReactNode } from 'react';
import { Nothing_You_Could_Do } from 'next/font/google';

const nothingYouCouldDo = Nothing_You_Could_Do({
  weight: '400',
  subsets: ['latin']
});

export default function Heading({ children }: { children: ReactNode }) {
    return <>
        <h2
            className={`
                font-bold 
                text-7xl 
                mb-8 
                mt-8 
                text-center
                ${nothingYouCouldDo.className}
            `}
        >
            {children}
        </h2>
    </>
}
