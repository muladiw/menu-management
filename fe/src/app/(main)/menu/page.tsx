/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import apiMenu from '@/api/menu';
import { useAppDispatch, useAppSelector } from '@/store';
import { increment } from '@/store/slices/counterSlice';
import { setDataMenu, setDepth } from '@/store/slices/menuSlice';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Schema } from './validation';

export default function MenuPage() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.menu);

  const getMenu = async () => {
    const result = await apiMenu.getData({});
    dispatch(setDataMenu(result.menu));
  };

  const { setValue, control, handleSubmit } = useForm({
    resolver: zodResolver(Schema),
  });

  const getLastDepth = async () => {
    const result = await apiMenu.getLastDepth({});
    const tempDepth = result.depth + 1;
    setValue('depth', tempDepth);
    setValue('depth2', tempDepth.toString());
  };

  useEffect(() => {
    getMenu();
    getLastDepth();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await apiMenu.postData({
      ...data,
      idParent: '1134725f-f50e-4b90-8459-40de1331e962',
    });
  };

  const clickAddRoot = () => {
    setValue('depth', 1);
    setValue('depth2', '1');
    setValue('parent', undefined);
    setValue('nameParent', '');
  };
  return (
    <div className='flex flex-col px-12'>
      {/* header */}
      <div className='flex justify-between py-4'>
        <div className='flex gap-2'>
          <Image src='/menu-breadcrumb.svg' alt='menu' width={24} height={24} />
          <span className='text-gray-300'>/</span>
          <span>Menus</span>
        </div>
      </div>
      {/* page title */}
      <div className='flex justify-between py-4'>
        <div className='flex gap-4 items-center'>
          <Image src='/title.svg' alt='title' width={52} height={52} />
          <span className='text-display-md font-extrabold'>Menus</span>
        </div>
      </div>
      {/* top 200 */}
      <div className='pt-1 w-1/3'>
        {/* content */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='' className='text-sm font-normal'>
            Menu
          </label>
          <div className='relative w-full'>
            <Image
              src='/dropdown.svg'
              alt='dropdown'
              width={24}
              height={24}
              className='absolute right-4 top-1/2 -translate-y-1/2'
            />
            <select className='px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full'>
              <option>siip</option>
            </select>
          </div>
        </div>
      </div>
      {/* top 278 */}
      <div className='grid grid-cols-2 gap-12'>
        <div className='pt-7 flex flex-col'>
          <div className='flex gap-2'>
            <button
              className='px-8 py-3 bg-blue-gray-800 rounded-4xl text-blue-gray-0'
              onClick={() => dispatch(increment())}
            >
              Expand All
            </button>
            <button className='px-8 py-3 border border-blue-gray-300 rounded-full text-blue-gray-600'>
              Collapse All
            </button>
          </div>
          {/* top 344 */}
          <div className='flex flex-col pt-6'>
            <div className='flex gap-3 pb-[5px] items-center'>
              <Image
                src='/menu-tree.svg'
                alt='menu-tree'
                width={26}
                height={26}
              />
              <span className='text-sm'>System Management</span>
            </div>
            <div className='flex flex-col relative'>
              <div className='pl-[13px] flex flex-col relative'>
                {/* <span className='border-l h-full top-0 left-[13px] border-blue-gray-400 absolute' /> */}
                <div className='flex relative'>
                  <span className='border-l h-1/2 top-0 border-blue-gray-400 absolute' />
                  <span className='border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute' />
                  <div className='flex gap-3 items-center pl-[13px]'>
                    <Image
                      src='/menu-tree.svg'
                      alt='menu-tree'
                      width={26}
                      height={26}
                    />
                    <span className='text-sm'>System Management</span>
                  </div>
                </div>
                <div className='pl-[26px] py-[5px] flex flex-col relative'>
                  {/* <span className='border-l h-full top-0 left-[26px] border-blue-gray-400 absolute' /> */}
                  <div className='flex relative'>
                    <span className='border-l h-1/2 top-0 left-0 border-blue-gray-400' />
                    <span className='border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute' />
                    <div className='flex gap-3 items-center pl-[13px]'>
                      <Image
                        src='/menu-tree.svg'
                        alt='menu-tree'
                        width={26}
                        height={26}
                      />
                      <span className='text-sm'>Systems</span>
                      <button
                        className='rounded-full w-[24px] h-[24px] bg-arctic-blue-600 flex place-content-center'
                        onClick={clickAddRoot}
                      >
                        <Image
                          src='/plus.svg'
                          alt='plus'
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>
                  </div>
                  {JSON.stringify(menu)}
                  {menu.data.map((item, index) => (
                    <div
                      className='pl-[26px] py-[5px] flex flex-col relative'
                      key={index}
                    >
                      <span className='border-l h-full top-0 left-[26px] border-blue-gray-400 absolute' />
                      <div className='flex relative'>
                        {/* <span className='border-l h-1/2 top-0 left-0 border-blue-gray-400' /> */}
                        <span className='border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute' />
                        <div className='flex gap-3 items-center pl-[13px]'>
                          <Image
                            src='/menu-tree.svg'
                            alt='menu-tree'
                            width={26}
                            height={26}
                          />
                          <span className='text-sm'>Systems</span>
                          <button className='rounded-full w-[24px] h-[24px] bg-arctic-blue-600 flex place-content-center'>
                            <Image
                              src='/plus.svg'
                              alt='plus'
                              width={14}
                              height={14}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* disini */}
                  <div className='pl-[26px] py-[5px] flex flex-col relative'>
                    <span className='border-l h-full top-0 left-[26px] border-blue-gray-400 absolute' />
                    <div className='flex relative'>
                      {/* <span className='border-l h-1/2 top-0 left-0 border-blue-gray-400' /> */}
                      <span className='border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute' />
                      <div className='flex gap-3 items-center pl-[13px]'>
                        <Image
                          src='/menu-tree.svg'
                          alt='menu-tree'
                          width={26}
                          height={26}
                        />
                        <span className='text-sm'>Systems</span>
                        <button className='rounded-full w-[24px] h-[24px] bg-arctic-blue-600 flex place-content-center'>
                          <Image
                            src='/plus.svg'
                            alt='plus'
                            width={14}
                            height={14}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='pl-[26px] py-[5px] flex flex-col'>
                    <div className='flex relative'>
                      <span className='border-l h-1/2 top-0 left-0 border-blue-gray-400' />
                      <span className='border-t top-1/2 border-blue-gray-400 w-[13px] h-[1px] absolute' />
                      <div className='flex gap-3 items-center pl-[13px]'>
                        <Image
                          src='/menu-tree.svg'
                          alt='menu-tree'
                          width={26}
                          height={26}
                        />
                        <span className='text-sm'>Systems</span>
                        <button className='rounded-full w-[24px] h-[24px] bg-arctic-blue-600 flex place-content-center'>
                          <Image
                            src='/plus.svg'
                            alt='plus'
                            width={14}
                            height={14}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='pt-6 flex flex-col gap-8'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-sm font-normal'>
                Menu
              </label>
              <Controller
                name='id'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <input
                    {...field}
                    disabled
                    className='px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-sm font-normal'>
                Depth
              </label>
              <Controller
                name='depth2'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <input
                    {...field}
                    type='number'
                    disabled
                    className='px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-sm font-normal'>
                Parent Data
              </label>
              <Controller
                name='nameParent'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    disabled
                    className='px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='text-sm font-normal'>
                Name
              </label>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <input
                    {...field}
                    className='px-4 py-3.5 rounded-2xl bg-blue-gray-50 appearance-none outline-none w-full'
                  />
                )}
              />
            </div>
            <button className='px-8 py-3.5 bg-arctic-blue-600 rounded-4xl text-blue-gray-0 w-1/2'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
