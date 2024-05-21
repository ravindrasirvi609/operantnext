import type { NextPage } from "next";
import Image from "next/image";

const FrameComponent: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[31.3px] text-center text-2xs-4 text-gray-100 font-poppins">
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[9px] pl-2">
        <div className="flex-1 rounded-[20.84px] [background:linear-gradient(180deg,_#925fe2,_#7042c0)] flex flex-row items-start justify-start py-[13.9px] px-3.5 gap-[8.7px]">
          <div className="h-[83.4px] w-[83.4px]  relative rounded-[20.84px] [background:linear-gradient(180deg,_#925fe2,_#7042c0)] hidden" />
          <Image
            className="h-[55.6px] w-[53.8px] cursor-pointer relative z-[1]"
            loading="lazy"
            alt=""
            src="/opflogo.png"
            width={53.8}
            height={55.6}
          />
        </div>
      </div>
      <div className="flex flex-row items-start cursor-pointer justify-start gap-[7.9px] text-white">
        <Image
          className="h-[15.6px] w-[15.6px]  invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/dashboard.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative font-semibold text-black inline-block min-w-[60px]">
          Dashboard
        </div>
      </div>
      <div className="flex flex-row items-start cursor-pointer justify-start gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/cash.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative inline-block text-black min-w-[69px]">
          Payment Info
        </div>
      </div>
      <div className="flex flex-row items-start cursor-pointer justify-start gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/pencil.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative inline-block text-black min-w-[63px]">
          Registration
        </div>
      </div>
      <div className="flex flex-row items-start cursor-pointer justify-start gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/notebook.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative inline-block text-black min-w-[43px]">
          Courses
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start cursor-pointer justify-start gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/documentx.svg"
          width={15.6}
          height={15.6}
        />
        <div className="flex-1 relative text-black inline-block min-w-[78px]">
          Drop Semester
        </div>
      </div>
      <div className="flex flex-row items-end justify-start cursor-pointer gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/equalcircle.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative inline-block text-black min-w-[32px]">
          Result
        </div>
      </div>
      <div className="flex flex-row items-start justify-start cursor-pointer gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/annotation.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative inline-block text-black min-w-[34px]">
          Notice
        </div>
      </div>
      <div className="flex flex-row items-end justify-start cursor-pointer gap-[7.9px]">
        <Image
          className="h-[15.6px] w-[15.6px] invert relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/contactsalt.svg"
          width={15.6}
          height={15.6}
        />
        <div className="relative inline-block text-black min-w-[49px]">
          Schedule
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
