import Image from 'next/image';
export default function MenuPage() {
  return (
    <div className="pl-60">
      <div className="flex flex-col px-12">
        {/* header */}
        <div className="flex justify-between py-4">
          <div className="flex gap-2">
            <Image
              src="/menu-breadcrumb.svg"
              alt="menu"
              width={24}
              height={24}
            />
            <span className="text-gray-300">/</span>
            <span>Menus</span>
          </div>
        </div>
        {/* page title */}
        <div className="flex justify-between py-4">
          <div className="flex gap-4 items-center">
            <Image
              src="/title.svg"
              alt="title"
              width={52}
              height={52}
            />
            <span className="text-display-md font-extrabold">Menus</span>
          </div>
        </div>
        {/* top 200 */}
        <div className="pt-1 w-1/3">
          {/* content */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-sm font-normal"
            >
              Menu
            </label>
            <div className="relative w-full">
              <Image
                src="/dropdown.svg"
                alt="dropdown"
                width={24}
                height={24}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              />
              <select className="px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full">
                <option>siip</option>
              </select>
            </div>
          </div>
        </div>
        {/* top 278 */}
        <div className="grid grid-cols-2 gap-12">
          <div className="pt-7 flex flex-col">
            <div className="flex gap-2">
              <button className="px-8 py-3 bg-blue-gray-800 rounded-4xl text-blue-gray-0">
                Expand All
              </button>
              <button className="px-8 py-3 border border-blue-gray-300 rounded-full text-blue-gray-600">
                Collapse All
              </button>
            </div>
            {/* top 344 */}
            <div className="flex flex-col pt-6">
              <div className="flex gap-3 pb-[5px] items-center">
                <Image
                  src="/menu-tree.svg"
                  alt="menu-tree"
                  width={26}
                  height={26}
                />
                <span className="text-sm">System Management</span>
              </div>
              <div className="flex flex-col relative">
                <div className="pl-[13px] flex flex-col relative">
                  <span className="border-l h-full top-0 left-[13px] border-blue-gray-400 absolute" />
                  <div className="flex relative">
                    {/* <span className="border-l h-1/2 top-0 border-blue-gray-400 absolute" /> */}
                    <span className="border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute" />
                    <div className="flex gap-3 items-center pl-[13px]">
                      <Image
                        src="/menu-tree.svg"
                        alt="menu-tree"
                        width={26}
                        height={26}
                      />
                      <span className="text-sm">System Management</span>
                    </div>
                  </div>
                  <div className="pl-[26px] py-[5px] flex flex-col">
                    <div className="flex relative">
                      <span className="border-l h-1/2 top-0 left-0 border-blue-gray-400" />
                      <span className="border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute" />
                      <div className="flex gap-3 items-center pl-[13px]">
                        <Image
                          src="/menu-tree.svg"
                          alt="menu-tree"
                          width={26}
                          height={26}
                        />
                        <span className="text-sm">Systems</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pl-[13px] flex flex-col relative">
                  {/* <span className="border-l h-full top-0 left-[13px] border-blue-gray-400 absolute" /> */}
                  <div className="flex relative">
                    <span className="border-l h-1/2 top-0 border-blue-gray-400 absolute" />
                    <span className="border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute" />
                    <div className="flex gap-3 items-center pl-[13px]">
                      <Image
                        src="/menu-tree.svg"
                        alt="menu-tree"
                        width={26}
                        height={26}
                      />
                      <span className="text-sm">System Management</span>
                    </div>
                  </div>
                  <div className="pl-[26px] py-[5px] flex flex-col">
                    <div className="flex relative">
                      <span className="border-l h-1/2 top-0 left-0 border-blue-gray-400" />
                      <span className="border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute" />
                      <div className="flex gap-3 items-center pl-[13px]">
                        <Image
                          src="/menu-tree.svg"
                          alt="menu-tree"
                          width={26}
                          height={26}
                        />
                        <span className="text-sm">Systems</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-sm font-normal"
              >
                Menu
              </label>
              <input
                type="text"
                disabled
                className="px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-sm font-normal"
              >
                Depth
              </label>
              <input
                type="text"
                className="px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-sm font-normal"
              >
                Parent Data
              </label>
              <input
                type="text"
                className="px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-sm font-normal"
              >
                Name
              </label>
              <input
                type="text"
                className="px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full"
              />
            </div>
            <button className="px-8 py-3.5 bg-arctic-blue-600 rounded-4xl text-blue-gray-0 w-1/2">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
