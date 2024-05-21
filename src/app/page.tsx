"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HeaderNav from "./header";
import FrameComponent from "@/components/frame-componet";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface UserData {
  username: string;
  email: string;
}

const initialUserData: UserData | null = null;

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [role, setRole] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const isOrganization = role === "organization";

  const [rectangleCheckboxChecked, setRectangleCheckboxChecked] =
    useState(true);
  const [rectangleCheckbox1Checked, setRectangleCheckbox1Checked] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: UserData = response.data.data;
        const role = localStorage.getItem("role");
        const todayDate = new Date();
        const newformattedDate = todayDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setFormattedDate(newformattedDate);
        setUserData(userData);
        setRole(role);
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-24">
        <HeaderNav />
      </div>
      <form className="m-0 w-[1670px] bg-ghostwhite-100 max-w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal] mq950:pl-5 mq950:pr-5 mq950:box-border">
        <div className="w-64 bg-gray-700 flex flex-col items-start justify-start pt-0 px-4 pb-[347px] box-border gap-[28px] mq950:hidden mq950:pb-[226px] mq950:box-border">
          <button className="cursor-pointer [border:none] pt-6 px-8 pb-[22px] bg-[transparent] flex flex-row items-start justify-start gap-[8.1px] border-b-[1px] border-solid border-darkslategray-400">
            <div className="h-[29px] w-[18.1px] relative">
              <div className="absolute top-[0px] left-[0px] bg-goldenrod-200 w-[9.1px] h-[19.9px]" />
              <div className="absolute top-[19.9px] left-[9.1px] bg-goldenrod-200 w-[9.1px] h-[9.1px]" />
            </div>
            <div className="relative text-lgi leading-[29px] font-extrabold font-poppins text-white text-left">
              Operant Next
            </div>
          </button>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-3 gap-[8px] top-[0] z-[99] sticky">
            <div className="flex flex-row items-start justify-start py-0 px-6">
              <div className="relative text-sm leading-[24px] font-poppins text-lightslategray-100 text-left inline-block min-w-[39px]">
                MENU
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
              <button className="cursor-pointer [border:none] py-4 px-6 bg-goldenrod-200 self-stretch shadow-[0px_29px_120px_rgba(144,_112,_45,_0.32)] rounded-xl flex flex-row items-start justify-start gap-[12px] hover:bg-darkgoldenrod-200">
                <img
                  className="h-6 w-6 relative min-h-[24px]"
                  alt=""
                  src="/icon--home.svg"
                />
                <div className="relative text-sm leading-[24px] font-medium font-poppins text-white text-left inline-block min-w-[42px]">
                  Home
                </div>
              </button>
              <div className="flex flex-row items-start justify-start py-0 px-6">
                <div className="flex flex-row items-start justify-start gap-[12px]">
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                    loading="lazy"
                    alt=""
                    src="/calendar.svg"
                  />
                  <div className="relative text-sm leading-[24px] font-medium font-poppins text-lightsteelblue text-left inline-block min-w-[67px]">
                    Calendar
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start pt-0 px-6 pb-3">
            <div className="flex flex-row items-start justify-start gap-[12px]">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                loading="lazy"
                alt=""
                src="/solarbookoutline.svg"
              />
              <div className="relative text-sm leading-[24px] font-medium font-poppins text-lightsteelblue text-left inline-block min-w-[51px]">
                Course
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start pt-0 px-6 pb-5">
            <div className="flex flex-row items-start justify-start gap-[12px]">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                loading="lazy"
                alt=""
                src="/icon--team.svg"
              />
              <div className="relative text-sm leading-[24px] font-medium font-poppins text-lightsteelblue text-left inline-block min-w-[91px]">
                Leaderboard
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start py-0 px-6">
            <div className="flex flex-col items-start justify-start gap-[24px]">
              <div className="relative text-sm leading-[24px] font-poppins text-lightslategray-100 text-left inline-block min-w-[43px]">
                Profile
              </div>
              <div className="flex flex-row items-start justify-start pt-0 px-0 pb-4 gap-[12px]">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  loading="lazy"
                  alt=""
                  src="/icon--settings.svg"
                />
                <div className="relative text-sm leading-[24px] font-medium font-poppins text-lightsteelblue text-left inline-block min-w-[58px]">
                  Settings
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[12px]">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  loading="lazy"
                  alt=""
                  src="/icon--logout.svg"
                />
                <div className="relative text-sm leading-[24px] font-medium font-poppins text-lightsteelblue text-left inline-block min-w-[48px]">
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 flex flex-col items-start justify-start gap-[28px] max-w-[calc(100%_-_256px)] mq950:max-w-full">
          <section className="self-stretch flex flex-row items-start justify-start py-0 pr-9 pl-8 box-border max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full">
              <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[12px]">
                <div className="flex-1 rounded-xl bg-white flex flex-col items-start justify-start p-4 box-border gap-[16px] min-w-[202px] max-w-[270px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
                    <img
                      className="h-16 w-16 relative rounded-xl min-h-[64px]"
                      loading="lazy"
                      alt=""
                      src="/icon.svg"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0">
                      <div className="relative text-base leading-[24px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[101px]">
                        Total Course
                      </div>
                      <div className="relative text-13xl leading-[40px] font-semibold font-poppins text-gray-600 text-left inline-block min-w-[41px] mq950:text-7xl mq950:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                        89
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-2.5 px-0 pb-0 gap-[12px] border-t-[1px] border-solid border-ghostwhite-200">
                    <div className="flex-1 relative text-base leading-[24px] capitalize font-poppins text-darkgoldenrod-100 text-left">
                      See Details
                    </div>
                    <img
                      className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                      alt=""
                      src="/arrowright.svg"
                    />
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-white flex flex-col items-start justify-start p-4 box-border gap-[16px] min-w-[202px] max-w-[270px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
                    <img
                      className="h-16 w-16 relative rounded-xl min-h-[64px]"
                      alt=""
                      src="/icon-1.svg"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0">
                      <div className="relative text-base leading-[24px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[124px]">
                        Total Workshop
                      </div>
                      <div className="relative text-13xl leading-[40px] font-semibold font-poppins text-gray-600 text-left inline-block min-w-[39px] mq950:text-7xl mq950:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                        52
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-2.5 px-0 pb-0 gap-[12px] border-t-[1px] border-solid border-ghostwhite-200">
                    <div className="flex-1 relative text-base leading-[24px] capitalize font-poppins text-darkgoldenrod-100 text-left">
                      See Details
                    </div>
                    <img
                      className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                      alt=""
                      src="/arrowright.svg"
                    />
                  </div>
                </div>
                <div className="flex-1 rounded-xl bg-white flex flex-col items-start justify-start p-4 box-border gap-[16px] min-w-[202px] max-w-[270px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
                    <img
                      className="h-16 w-16 relative rounded-xl min-h-[64px]"
                      alt=""
                      src="/icon-2.svg"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0">
                      <div className="relative text-base leading-[24px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[69px]">
                        Avg Quiz
                      </div>
                      <div className="relative text-13xl leading-[40px] font-semibold font-poppins text-gray-600 text-left inline-block min-w-[68px] mq950:text-7xl mq950:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                        80%
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-2.5 px-0 pb-0 gap-[12px] border-t-[1px] border-solid border-ghostwhite-200">
                    <div className="flex-1 relative text-base leading-[24px] capitalize font-poppins text-darkgoldenrod-100 text-left">
                      See Details
                    </div>
                    <img
                      className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                      alt=""
                      src="/arrowright.svg"
                    />
                  </div>
                </div>
                <div className="flex-1 shadow-[0px_29px_120px_rgba(144,_112,_45,_0.32)] rounded-xl bg-goldenrod-100 flex flex-col items-start justify-start p-4 box-border gap-[16px] min-w-[202px] max-w-[270px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
                    <img
                      className="h-16 w-16 relative rounded-xl min-h-[64px]"
                      alt=""
                      src="/icon-3.svg"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0">
                      <div className="relative text-base leading-[24px] capitalize font-poppins text-white text-left inline-block min-w-[92px]">
                        Certificates
                      </div>
                      <div className="relative text-13xl leading-[40px] font-semibold font-poppins text-white text-left inline-block min-w-[42px] mq950:text-7xl mq950:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                        56
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-2.5 px-0 pb-0 gap-[12px] border-t-[1px] border-solid border-goldenrod-300">
                    <div className="flex-1 relative text-base leading-[24px] capitalize font-poppins text-white text-left">
                      See Details
                    </div>
                    <img
                      className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                      alt=""
                      src="/arrowright-3.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[12px] max-w-full">
                <div className="w-[270px] flex flex-col items-start justify-start">
                  <div className="self-stretch h-[198px] rounded-t-xl rounded-b-none bg-honeydew-100 overflow-hidden shrink-0 flex flex-row items-start justify-start pt-0 pb-[39px] pr-5 pl-[135px] box-border gap-[9px] mq700:pl-[67px] mq700:box-border">
                    <img
                      className="ml-[-213px] h-[276px] w-[204px] relative overflow-hidden shrink-0 object-cover [debug_commit:bf4bc93]"
                      alt=""
                      src="/frame@2x.png"
                    />
                    <div className="w-[115px] flex flex-col items-start justify-start pt-[39px] px-0 pb-0 box-border shrink-0">
                      <div className="self-stretch flex flex-col items-start justify-start gap-[8px] shrink-0 [debug_commit:bf4bc93]">
                        <div className="relative text-xs leading-[16px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[52px]">
                          Classnia
                        </div>
                        <b className="self-stretch relative text-base leading-[24px] font-poppins text-black text-left">
                          Amazing way to learn UX/UI Design for mobile
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-t-none rounded-b-xl bg-white overflow-hidden flex flex-col items-start justify-start p-4 gap-[8px]">
                    <div className="self-stretch relative text-base leading-[24px] font-medium font-poppins text-black text-left">
                      Amazing way to learn UX/UI Design for mobile
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 pr-[77px] pl-0 gap-[24px]">
                      <div className="flex flex-row items-center justify-start gap-[5px]">
                        <img
                          className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
                          alt=""
                          src="/calendar-1.svg"
                        />
                        <div className="relative text-xs leading-[16px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[40px]">
                          Dec, 21
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[5px]">
                        <img
                          className="h-4 w-4 relative overflow-hidden shrink-0 min-h-[16px]"
                          loading="lazy"
                          alt=""
                          src="/clock.svg"
                        />
                        <div className="relative text-xs leading-[16px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[55px] whitespace-nowrap">
                          09:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="h-[302px] w-[82px] rounded-xl object-contain min-h-[302px]"
                  loading="lazy"
                  alt=""
                  src="/view-more@2x.png"
                />
                <div className="flex-1 rounded-xl bg-white flex flex-col items-start justify-start pt-4 px-4 pb-6 box-border gap-[38px] min-w-[481px] max-w-full mq700:min-w-full mq950:gap-[19px]">
                  <h3 className="m-0 relative text-5xl leading-[32px] capitalize font-medium font-poppins text-gray-700 text-left mq450:text-lgi mq450:leading-[26px]">
                    Hours Spent
                  </h3>
                  <div className="self-stretch flex flex-row items-start justify-start py-0 px-2 box-border max-w-full">
                    <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-[20px] mq700:flex-wrap">
                      <div className="h-[135px] w-14 flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex-1 relative rounded-t-980xl rounded-b-3xl bg-honeydew-200" />
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-3">
                          <div className="flex-1 relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center">
                            Sun
                          </div>
                        </div>
                      </div>
                      <div className="w-[268px] flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex flex-row items-end justify-between gap-[20px] mq450:flex-wrap mq450:justify-center">
                          <div className="h-[164px] w-[162px] flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-row items-start justify-start py-0 px-[49px]">
                              <button className="cursor-pointer [border:none] py-1 px-3 bg-gray-700 rounded-[31px] flex flex-row items-start justify-start z-[1] hover:bg-darkslategray-300">
                                <b className="relative text-base leading-[24px] inline-block font-poppins text-white text-center min-w-[30px]">
                                  32h
                                </b>
                              </button>
                            </div>
                            <div className="self-stretch flex flex-row items-start justify-start py-0 px-[69px]">
                              <img
                                className="h-[9px] w-3.5 relative object-contain z-[1]"
                                loading="lazy"
                                alt=""
                                src="/polygon.svg"
                              />
                            </div>
                            <div className="self-stretch flex-1 flex flex-row items-end justify-between gap-[20px]">
                              <div className="h-[83px] w-14 relative rounded-t-980xl rounded-b-3xl bg-honeydew-200" />
                              <div className="self-stretch w-14 relative rounded-t-980xl rounded-b-3xl bg-honeydew-200" />
                            </div>
                          </div>
                          <div className="h-[162px] w-14 relative rounded-t-980xl rounded-b-3xl bg-honeydew-200" />
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-3">
                          <div className="flex-1 flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap mq450:justify-center">
                            <div className="relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center inline-block min-w-[32px]">
                              Mon
                            </div>
                            <div className="w-8 relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center inline-block shrink-0">
                              Tue
                            </div>
                            <div className="relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center inline-block min-w-[32px]">
                              Wed
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-[111px] w-14 flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex-1 relative rounded-t-980xl rounded-b-3xl bg-honeydew-200" />
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-3">
                          <div className="flex-1 relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center">
                            Thu
                          </div>
                        </div>
                      </div>
                      <div className="h-[141px] w-14 flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex-1 relative shadow-[0px_29px_56px_rgba(144,_112,_45,_0.16)] rounded-t-980xl rounded-b-xl bg-goldenrod-200" />
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-3">
                          <div className="flex-1 relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center">
                            Fri
                          </div>
                        </div>
                      </div>
                      <div className="h-[92px] w-14 flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex-1 relative rounded-t-980xl rounded-b-3xl bg-honeydew-200" />
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-3">
                          <div className="flex-1 relative text-sm leading-[20px] font-poppins text-lightslategray-200 text-center">
                            Sat
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-center gap-[13px] max-w-full mq975:flex-wrap">
                <div className="w-[457px] rounded-xl bg-white flex flex-col items-start justify-start pt-4 px-4 pb-10 box-border gap-[16px] min-w-[457px] max-w-full mq975:flex-1 mq700:min-w-full">
                  <div className="self-stretch flex flex-row items-end justify-between gap-[20px]">
                    <h3 className="m-0 relative text-5xl leading-[32px] capitalize font-medium font-poppins text-gray-700 text-left inline-block min-w-[113px] mq450:text-lgi mq450:leading-[26px]">
                      To Do List
                    </h3>
                    <div className="flex flex-row items-center justify-center gap-[8px]">
                      <div className="relative text-base leading-[24px] capitalize font-poppins text-slategray-200 text-left inline-block min-w-[29px]">
                        Edit
                      </div>
                      <img
                        className="h-4 w-4 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/edit3.svg"
                      />
                    </div>
                  </div>
                  <div className="w-[425px] overflow-x-auto flex flex-col items-start justify-start gap-[11px] max-w-full">
                    <div className="w-[425px] flex flex-row items-start justify-start py-0 pr-[116px] pl-0 box-border gap-[8px]">
                      <input
                        className="m-0 h-6 w-6 relative overflow-hidden shrink-0"
                        type="checkbox"
                      />
                      <div className="flex flex-col items-start justify-start gap-[4px]">
                        <div className="relative text-base leading-[24px] font-poppins text-black text-left">
                          Join UI Design Class with my friend
                        </div>
                        <div className="relative text-base leading-[24px] font-poppins text-slategray-200 text-left inline-block min-w-[110px] whitespace-nowrap">
                          Sun, 09:00 AM
                        </div>
                      </div>
                    </div>
                    <div className="w-[425px] flex flex-row items-start justify-start gap-[8px]">
                      <div className="h-6 w-6 relative overflow-hidden shrink-0">
                        <input
                          className="accent-goldenrod-200 m-0 absolute h-[83.33%] w-[83.33%] top-[8.33%] right-[8.33%] bottom-[8.33%] left-[8.33%] rounded"
                          checked={rectangleCheckboxChecked}
                          type="checkbox"
                          onChange={(event) =>
                            setRectangleCheckboxChecked(event.target.checked)
                          }
                        />
                        <img
                          className="absolute h-[20.83%] w-[33.33%] top-[37.5%] right-[33.33%] bottom-[41.67%] left-[33.33%] max-w-full overflow-hidden max-h-full z-[1]"
                          loading="lazy"
                          alt=""
                          src="/vector.svg"
                        />
                      </div>
                      <div className="flex-1 flex flex-col items-start justify-start gap-[4px] max-w-full">
                        <div className="self-stretch relative text-base leading-[24px] font-poppins text-black text-left">
                          do the assignment given by coach Dery
                        </div>
                        <div className="relative text-base leading-[24px] font-poppins text-slategray-200 text-left inline-block min-w-[110px] whitespace-nowrap">
                          Sun, 08:00 AM
                        </div>
                      </div>
                    </div>
                    <div className="w-[425px] flex flex-row items-start justify-start py-0 pr-56 pl-0 box-border gap-[8px]">
                      <div className="h-6 w-6 relative overflow-hidden shrink-0">
                        <input
                          className="accent-goldenrod-200 m-0 absolute h-[83.33%] w-[83.33%] top-[8.33%] right-[8.33%] bottom-[8.33%] left-[8.33%] rounded"
                          checked={rectangleCheckbox1Checked}
                          type="checkbox"
                          onChange={(event) =>
                            setRectangleCheckbox1Checked(event.target.checked)
                          }
                        />
                        <img
                          className="absolute h-[20.83%] w-[33.33%] top-[37.5%] right-[33.33%] bottom-[41.67%] left-[33.33%] max-w-full overflow-hidden max-h-full z-[1]"
                          alt=""
                          src="/vector.svg"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-[4px]">
                        <div className="relative text-base leading-[24px] font-poppins text-black text-left">
                          Upgrade to premium
                        </div>
                        <div className="relative text-base leading-[24px] font-poppins text-slategray-200 text-left inline-block min-w-[109px] whitespace-nowrap">
                          Sun, 07:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[282px] flex-1 rounded-xl bg-white overflow-hidden flex flex-col items-start justify-start pt-4 px-4 pb-[186px] box-border gap-[16px] min-w-[420px] max-w-full mq700:pt-5 mq700:pb-[121px] mq700:box-border mq700:min-w-full">
                  <h3 className="m-0 self-stretch relative text-5xl leading-[32px] capitalize font-medium font-poppins text-gray-700 text-left mq450:text-lgi mq450:leading-[26px]">
                    Leaderboard
                  </h3>
                  <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-3.5 gap-[25.7px] border-b-[1px] border-solid border-gainsboro">
                    <div className="relative text-sm leading-[16px] uppercase font-poppins text-gray-500 text-left inline-block min-w-[21px]">
                      No
                    </div>
                    <div className="flex-1 relative text-sm leading-[16px] uppercase font-poppins text-gray-500 text-left">
                      item
                    </div>
                    <div className="w-[124px] relative text-sm leading-[16px] uppercase font-poppins text-gray-500 text-center inline-block shrink-0">
                      Course
                    </div>
                    <div className="w-[134px] relative text-sm leading-[16px] uppercase font-poppins text-gray-500 text-center inline-block shrink-0">
                      Point
                    </div>
                  </div>
                  <div className="w-[614px] overflow-x-auto flex flex-col items-start justify-start gap-[16px] max-w-full">
                    <div className="w-[614px] flex flex-row items-start justify-start gap-[29px]">
                      <div className="w-[21px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          1
                        </div>
                      </div>
                      <div className="flex-1 flex flex-row items-start justify-start gap-[12px]">
                        <div className="h-[52px] w-[52px] relative rounded-980xl bg-honeydew-200" />
                        <div className="flex-1 flex flex-col items-start justify-start pt-[18px] px-0 pb-0">
                          <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-left">
                            Harold Jacob
                          </div>
                        </div>
                      </div>
                      <div className="w-[124px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          129
                        </div>
                      </div>
                      <div className="w-[124px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          11,232
                        </div>
                      </div>
                    </div>
                    <div className="w-[614px] flex flex-row items-start justify-start gap-[29px]">
                      <div className="flex-1 flex flex-row items-start justify-start gap-[12px]">
                        <div className="w-[38px] flex flex-col items-start justify-start pt-[18px] pb-0 pr-[17px] pl-0 box-border">
                          <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                            2
                          </div>
                        </div>
                        <div className="h-[52px] w-[52px] relative rounded-980xl bg-honeydew-200" />
                        <div className="flex-1 flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border min-w-[126px]">
                          <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-left">
                            Brandie Ronald
                          </div>
                        </div>
                      </div>
                      <div className="w-[124px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          108
                        </div>
                      </div>
                      <div className="w-[124px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          8,442
                        </div>
                      </div>
                    </div>
                    <div className="w-[614px] flex flex-row items-start justify-start gap-[29px]">
                      <div className="flex-1 flex flex-row items-start justify-start gap-[12px]">
                        <div className="w-[38px] flex flex-col items-start justify-start pt-[18px] pb-0 pr-[17px] pl-0 box-border">
                          <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                            3
                          </div>
                        </div>
                        <div className="h-[52px] w-[52px] relative rounded-980xl bg-honeydew-200" />
                        <div className="flex-1 flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border min-w-[126px]">
                          <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-left">
                            Irma Sennyia
                          </div>
                        </div>
                      </div>
                      <div className="w-[124px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          98
                        </div>
                      </div>
                      <div className="w-[124px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border">
                        <div className="self-stretch relative text-base leading-[16px] font-poppins text-gray-800 text-center">
                          7,864
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </form>
    </>
  );
}
