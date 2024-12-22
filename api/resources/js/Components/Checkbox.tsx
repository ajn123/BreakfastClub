import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-gray-900 shadow-sm dark:border-gray-700 bg-white checked:bg-orange-500 checked:border-orange-500 focus:ring-orange-500 focus:ring-2 ' +
                className
            }
        />
    );
}
