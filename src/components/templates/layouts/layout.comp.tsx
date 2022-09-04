/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from 'react';

import Navbar from '../navbar/navbar.comp';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const BaseLayout = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}
    <Navbar />
    <div className="min-h-screen overflow-hidden bg-gray-50 py-16">
      <div className="max-w-7l mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        {props.children}
      </div>
    </div>
  </div>
);

export default BaseLayout;
