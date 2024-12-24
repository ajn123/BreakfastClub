import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="50"
                y="90"
                textAnchor="middle"
                fill="black"
                fontFamily="Arial, sans-serif"
                fontSize="8"
                fontWeight="bold"
            >
                DC OFFLINE COMMUNITY
            </text>
        </svg >
    );
}
