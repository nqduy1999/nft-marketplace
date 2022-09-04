import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const BaseLayout = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}
    <div className="content py-5 text-xl">{props.children}</div>
  </div>
);

export { BaseLayout };
