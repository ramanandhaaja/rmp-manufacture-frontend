import React, { cloneElement } from 'react';
import { Container } from 'components/shared';
// import { Card } from 'components/ui';

const Simple = ({ children, content, ...rest }) => {
  return (
    <div className="h-full grid grid-cols-2 gap-4 bg-white p-8">
      <Container className="flex flex-col items-center h-full gap-10 py-[120px] bg-white rounded-xl">
        <div className='min-w-[388px]'>
          {content}
          {children ? cloneElement(children, { contentClassName: 'text-center', ...rest }) : null}
        </div>
        <div className="text-center text-slate-400 text-sm font-normal font-['Century Gothic'] leading-[21px]">© {new Date().getFullYear()} ROYAL MEDICA ALL RIGHTS RESERVED</div>
      </Container>
      <Container className="flex flex-col flex-auto items-center justify-center h-full">
        <img className="h-full" src="/img/others/bg-login.png" alt="logo" />
      </Container>
    </div>
  );
};

export default Simple;
