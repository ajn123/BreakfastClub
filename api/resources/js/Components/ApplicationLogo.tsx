import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Snow Globe Base */}
            <path d="M30 85 C30 95, 70 95, 70 85" fill="currentColor" />
            <rect x="40" y="85" width="20" height="10" fill="currentColor" />

            {/* Globe */}
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />

            {/* Snow particles */}
            <circle cx="35" cy="35" r="1" fill="currentColor" />
            <circle cx="65" cy="40" r="1" fill="currentColor" />
            <circle cx="45" cy="30" r="1" fill="currentColor" />
            <circle cx="55" cy="45" r="1" fill="currentColor" />
            <circle cx="40" cy="55" r="1" fill="currentColor" />
            <circle cx="60" cy="60" r="1" fill="currentColor" />

            {/* Whitehouse inside globe */}
            <g transform="translate(0,10) scale(0.7)">
                {/* Capitol Building Base */}
                <rect x="30" y="60" width="40" height="30" fill="currentColor" />

                {/* Capitol Dome */}
                <path d="M50 20 
                         A20 20 0 0 1 70 40
                         L70 60 
                         L30 60
                         L30 40
                         A20 20 0 0 1 50 20"
                    fill="currentColor" />

                {/* Columns */}
                <rect x="35" y="40" width="4" height="20" fill="white" />
                <rect x="43" y="40" width="4" height="20" fill="white" />
                <rect x="51" y="40" width="4" height="20" fill="white" />
                <rect x="59" y="40" width="4" height="20" fill="white" />

                {/* Steps */}
                <rect x="25" y="90" width="50" height="3" fill="currentColor" />
                <rect x="27" y="87" width="46" height="3" fill="currentColor" />
                <rect x="29" y="84" width="42" height="3" fill="currentColor" />

                {/* Flag on top */}
                <line x1="50" y1="20" x2="50" y2="10" strokeWidth="2" stroke="currentColor" />
                <path d="M50 10 L60 13 L50 16" fill="currentColor" />

                {/* Windows */}
                <rect x="35" y="65" width="6" height="10" fill="white" />
                <rect x="45" y="65" width="6" height="10" fill="white" />
                <rect x="55" y="65" width="6" height="10" fill="white" />
            </g>
        </svg>
    );
}
