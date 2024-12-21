import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center  pt-6 sm:justify-center sm:pt-0 orange-body">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden px-6 py-4 shadow-xl sm:max-w-md sm:rounded-lg orange-body-dark">
                {children}
            </div>
        </div>
    );
}
