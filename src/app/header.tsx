"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DropdownMenuDemo } from "@/components/dropdown";
import Swal from "sweetalert2";
import UserData from "./page";

const studentNavigation = [
  { name: "Conferences", href: "/events" },
  { name: "Jobs", href: "/jobs" },
  { name: "Articles", href: "/article/articleList" },
  { name: "Courses", href: "/courses" },
  { name: "Resources", href: "/resources" },
  // { name: "Assignments", href: "/Assignments" },
];

const collegeNavigation = [
  { name: "Post-Event", href: "/events/create-edit-event" },
  { name: "Conferences", href: "/events" },
  { name: "Collaborations", href: "/collaborations" },
  { name: "Resources", href: "/resources" },
  { name: "Forums", href: "/forums" },
];

const teacherNavigation = [
  { name: "Review-Articles", href: "/profile" },
  { name: "Conferences", href: "/events" },
  { name: "Classes", href: "/classes" },
  { name: "Resources", href: "/resources" },
  { name: "Forums", href: "/forums" },
];

const companyNavigation = [
  { name: "Job Postings", href: "/jobs/create-job" },
  { name: "Events", href: "/events" },
  { name: "Recruitment", href: "/jobPostings" },
  { name: "Resources", href: "/resources" },
  { name: "Forums", href: "/forums" },
];

const initialUserData: typeof UserData | null = null;

export default function HeaderNav() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>();
  const [userData, setUserData] = useState<typeof UserData | null>(
    initialUserData
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: typeof UserData = response.data.data;
        const role = localStorage.getItem("role");
        setUserData(userData);
        setRole(role);
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  let navigation: any[];
  switch (role) {
    case "STUDENT":
      navigation = studentNavigation;
      break;
    case "COLLEGE":
      navigation = collegeNavigation;
      break;
    case "TEACHER":
      navigation = teacherNavigation;
      break;
    case "COMPANY":
      navigation = companyNavigation;
      break;
    default:
      navigation = [];
      break;
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-lime-200">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Operant</span>
            <Image
              className="h-9 w-auto"
              src="/opflogo.png"
              alt=""
              width={800}
              height={500}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <DropdownMenuDemo userData={userData} />
          {/* <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={logout}
          >
            Logout <span aria-hidden="true">&rarr;</span>
          </button> */}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Operant Pharmacy Federation</span>
              <Image
                className="h-8 w-auto"
                src="/opflogo.png"
                alt=""
                width={800}
                height={500}
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <DropdownMenuDemo />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
