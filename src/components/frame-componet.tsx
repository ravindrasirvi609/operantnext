import type { NextPage } from "next";
import Image from "next/image";

const menuItems = [
  { src: "/dashboard.svg", alt: "Dashboard", text: "Dashboard" },
  { src: "/cash.svg", alt: "Payment Info", text: "Payment Info" },
  { src: "/pencil.svg", alt: "Registration", text: "Registration" },
  { src: "/notebook.svg", alt: "Courses", text: "Courses" },
  { src: "/documentx.svg", alt: "Drop Semester", text: "Drop Semester" },
  { src: "/equalcircle.svg", alt: "Result", text: "Result" },
  { src: "/annotation.svg", alt: "Notice", text: "Notice" },
  { src: "/contactsalt.svg", alt: "Schedule", text: "Schedule" },
];

const FrameComponent: NextPage = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-8 text-center text-xs text-gray-100 font-poppins">
      <div className="w-full flex flex-row items-center justify-start py-2 px-2">
        <div className="flex-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700 flex items-center justify-center py-3 px-4">
          <Image
            className="h-14 w-14 cursor-pointer"
            loading="lazy"
            alt="Logo"
            src="/opflogo.png"
            width={54}
            height={56}
          />
        </div>
      </div>

      {menuItems.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-row items-center cursor-pointer justify-start gap-2 text-black hover:text-purple-500 transition-colors"
        >
          <Image
            className="h-4 w-4 invert"
            loading="lazy"
            alt={item.alt}
            src={item.src}
            width={16}
            height={16}
          />
          <div className="relative font-bold  text-lg inline-block">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameComponent;
