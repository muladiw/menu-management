'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function LayoutMain({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <div className="py-8 pl-8 flex h-screen">
        <div className="h-full">
          <div className="bg-blue-gray-900 h-full w-60 rounded-3xl">
            <div className="flex justify-between px-8 py-[30px]">
              <Image
                src="/icon.svg"
                alt="icon"
                width={70}
                height={21}
              />
              <div className="h-6 w-6 flex place-content-center">
                <Image
                  src="/menu-open.svg"
                  alt="menu-open"
                  width={18}
                  height={12}
                />
              </div>
            </div>
            {/* content menu */}
            <div className="py-[10px] px-4 overflow-hidden flex flex-col">
              <div className="flex flex-col gap-2 overflow-y-auto scrollbar">
                <div className="bg-blue-gray-800 rounded-2xl py-2">
                  <div className="flex gap-4 p-3 items-center">
                    <Image
                      src="/menu-active.svg"
                      alt="menu"
                      width={24}
                      height={24}
                    />
                    <span className="font-bold text-blue-gray-0 text-sm">
                      Systems
                    </span>
                  </div>
                  <div className="flex gap-4 p-3 items-center">
                    <Image
                      src="/submenu.svg"
                      alt="menu"
                      width={24}
                      height={24}
                    />
                    <span className="font-bold text-blue-gray-500 text-sm">
                      System Code
                    </span>
                  </div>
                  <div className="flex gap-4 p-3 items-center">
                    <Image
                      src="/submenu.svg"
                      alt="menu"
                      width={24}
                      height={24}
                    />
                    <span className="font-bold text-blue-gray-500 text-sm">
                      Properties
                    </span>
                  </div>
                  <div className="flex gap-4 p-3 items-center rounded-2xl bg-lime-green-400">
                    <Image
                      src="/submenu-active.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      className="text-blue-gray-900"
                    />
                    <span className="font-bold text-blue-gray-500 text-sm">
                      Menus
                    </span>
                  </div>
                  <div className="flex gap-4 p-3 items-center">
                    <Image
                      src="/submenu.svg"
                      alt="menu"
                      width={24}
                      height={24}
                    />
                    <span className="font-bold text-blue-gray-500 text-sm">
                      API List
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 p-3 items-center">
                  <Image
                    src="/menu.svg"
                    alt="menu"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold text-blue-gray-500 text-sm">
                    Users & Group
                  </span>
                </div>
                <div className="flex gap-4 p-3 items-center">
                  <Image
                    src="/menu.svg"
                    alt="menu"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold text-blue-gray-500 text-sm">
                    Competition
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto w-full flex">{children}</div>
      </div>
    </Provider>
  );
}
