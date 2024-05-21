"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HeaderNav from "./header";
import FrameComponent from "@/components/frame-componet";
import Image from "next/image";

export interface UserData {
  username: string;
  email: string;
}
const initialUserData: UserData | null = null;

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [role, setRole] = useState<string | null>();
  const isOrganization = role === "organization";

  let myobj = {
    role: role,
    isOrganization: isOrganization,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: UserData = response.data.data;
        const role = localStorage.getItem("role");
        // Set the user data and role to the state
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
      <div className="mb-20">
        <HeaderNav />
      </div>
      <div className="w-full h-full relative bg-thistle overflow-hidden flex flex-row items-start justify-center pt-[26px] px-5 pb-[27px] box-border leading-[normal] tracking-[normal]">
        <main className="w-[1920px] h-[1080px] shadow-[7.8px_7.8px_31.27px_15.63px_rgba(0,_0,_0,_0.12)] rounded-[15.63px] bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[20.8px] px-5 pb-[20.9px] box-border gap-[31.3px] max-w-full text-center text-2xs-4 text-gray-200 font-poppins mq650:gap-[16px] mq725:pt-5 mq725:pb-5 mq725:box-border">
          <div className="w-[151.8px] rounded-[15.63px] [background:linear-gradient(0deg,_#925fe2,_rgba(146,_95,_226,_0),_#e2d4f7)] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[31.3px] px-[25px] pb-[30.8px] box-border gap-[85.7px] mq650:hidden mq650:pt-5 mq650:pb-5 mq650:box-border">
            <FrameComponent />
            <div className="flex flex-row items-start justify-start gap-[7.9px]">
              <Image
                className="h-[15.6px] w-[15.6px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/logout.svg"
                width={15.6}
                height={15.6}
              />
              <div className="relative inline-block min-w-[36px]">Logout</div>
            </div>
          </div>
          <section className="flex-1 flex flex-col items-start justify-start gap-[30.9px] max-w-[calc(100%_-_183px)] text-center text-2xs-4 text-gray-200 font-poppins mq650:max-w-full mq725:gap-[15px]">
            <header className="self-stretch h-8 flex flex-row items-start justify-between gap-[20px] text-center text-2xs-4 text-black font-poppins">
              <input
                className="w-[256.6px] [border:none] [outline:none] bg-white h-[31.3px] shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] overflow-hidden flex flex-row items-start justify-end pt-[7.9px] px-6 pb-[7.4px] box-border font-poppins text-2xs-4 text-gray-300"
                placeholder="Search"
                type="text"
              />
              <div className="self-stretch w-[190.8px] flex flex-row items-start justify-start gap-[86.1px]">
                <div className="self-stretch flex flex-row items-start justify-start gap-[7.8px]">
                  <div className="h-[31px] w-[31.3px] relative rounded-[234.49px] shrink-0 flex items-center justify-center">
                    <Image
                      className="h-full w-full overflow-hidden shrink-0 object-contain absolute left-[5px] top-[5px] [transform:scale(3.354)]"
                      loading="lazy"
                      alt=""
                      src="/frame-19@2x.png"
                      width={31.3}
                      height={31}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="relative font-semibold inline-block min-w-[50px] whitespace-nowrap">
                      John Doe
                    </div>
                    <div className="relative text-gray-300 inline-block min-w-[44px] whitespace-nowrap">
                      3rd year
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[15.6px] w-[15.6px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/bellringing.svg"
                  width={15.6}
                  height={15.6}
                />
              </div>
            </header>
            <div className="self-stretch h-[166.8px] shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] [background:linear-gradient(98.5deg,_#925fe2,_#dfcff7)] overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[31.2px] px-[38px] pb-[31.4px] box-border gap-[52.4px] max-w-full mq450:gap-[26px]">
              <div className="flex flex-col items-start justify-start gap-[40.7px]">
                <div className="relative whitespace-pre-wrap inline-block min-w-[100px]">
                  September 4, 2023
                </div>
                <div className="h-[47.5px] flex flex-col items-start justify-start pt-0 px-0 pb-[16.5px] box-border gap-[0.6px] text-[20.8px] text-white">
                  <div className="relative font-semibold shrink-0 [debug_commit:bf4bc93] mq450:text-[17px]">
                    Welcome back, John!
                  </div>
                  <div className="relative text-2xs-4 text-gray-200 shrink-0 [debug_commit:bf4bc93]">
                    Always stay updated in your student portal
                  </div>
                </div>
              </div>
              <div className="mt-[-71.60000000000002px] h-[287.4px] w-[411.6px] relative max-w-[calc(100%_-_281px)] shrink-0">
                <Image
                  className="absolute top-[84.7px] left-[275.5px] w-[136.1px] h-[136.1px] object-contain"
                  loading="lazy"
                  alt=""
                  src="/backpack@2x.png"
                  width={136.1}
                  height={136.1}
                />
                <Image
                  className="absolute h-full top-[0px] bottom-[0px] left-[0px] max-h-full w-[287.4px] object-contain z-[1]"
                  alt=""
                  src="/scholarcap-scroll@2x.png"
                  width={287.4}
                  height={287.4}
                />
                <Image
                  className="absolute top-[28.7px] left-[176.5px] rounded-[5.95px] w-[178.5px] h-[178.5px] overflow-hidden object-cover z-[2]"
                  alt=""
                  src="/5-college-student@2x.png"
                  width={178.5}
                  height={178.5}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[7.3px] max-w-full shrink-0 text-smi text-black">
              <div className="w-[639.1px] flex flex-row items-start justify-between gap-[20px] max-w-full mq450:flex-wrap">
                <div className="relative font-semibold inline-block min-w-[62px]">
                  Finanace
                </div>
                <div className="relative font-semibold inline-block min-w-[116px]">
                  Course intructors
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[30.6px] box-border gap-[30.9px] max-w-full mq725:flex-wrap mq725:gap-[15px]">
                <div className="flex-1 flex flex-col items-start justify-start gap-[31.3px] max-w-full mq650:gap-[16px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[15.6px] mq650:flex-wrap">
                    <div className="flex-1 shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] bg-white overflow-hidden flex flex-col items-end justify-start pt-[42.8px] px-[41px] pb-[18.7px] box-border gap-[7.8px] min-w-[115px]">
                      <div className="flex flex-row items-start justify-end py-0 pr-[7px] pl-2">
                        <Image
                          className="h-[38.7px] w-[55.3px] relative"
                          loading="lazy"
                          alt=""
                          src="/file--pen.svg"
                          width={55.3}
                          height={38.7}
                        />
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="flex flex-row items-start justify-start py-0 px-2">
                          <div className="relative font-semibold inline-block min-w-[54px] whitespace-nowrap">
                            $ 10,000
                          </div>
                        </div>
                        <div className="relative text-2xs-4 text-gray-300 inline-block min-w-[71px]">
                          Total Payable
                        </div>
                      </div>
                    </div>
                    <div className="flex-[0.9409] shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] bg-white box-border overflow-hidden flex flex-col items-start justify-start pt-[15px] pb-4 pr-10 pl-[41px] gap-[7.9px] min-w-[115px] border-[2.6px] border-solid border-mediumslateblue-100 mq450:flex-1">
                      <div className="w-[65.2px] h-[62.5px] relative flex items-center justify-center">
                        <Image
                          className="w-full h-full object-contain absolute left-[-3px] top-[-3px] [transform:scale(1.17)]"
                          loading="lazy"
                          alt=""
                          src="/group-14.svg"
                          width={65.2}
                          height={62.5}
                        />
                      </div>
                      <div className="flex flex-row items-start justify-start py-0 pr-2 pl-1.5">
                        <div className="flex flex-col items-start justify-start">
                          <div className="flex flex-row items-start justify-start py-0 px-px">
                            <div className="relative font-semibold inline-block min-w-[49px] whitespace-nowrap">
                              $ 5,000
                            </div>
                          </div>
                          <div className="relative text-2xs-4 text-gray-300 inline-block min-w-[52px]">
                            Total Paid
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-[0.6353] shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] bg-white overflow-hidden flex flex-col items-start justify-start pt-[18.5px] px-[54px] pb-[19.1px] box-border gap-[7.9px] min-w-[115px] mq450:flex-1">
                      <Image
                        className="w-[44.6px] h-[62.5px] relative"
                        loading="lazy"
                        alt=""
                        src="/group-15.svg"
                        width={44.6}
                        height={62.5}
                      />
                      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-1 pl-[3px]">
                        <div className="flex flex-col items-start justify-start">
                          <div className="relative font-semibold inline-block min-w-[37px] whitespace-nowrap">
                            $ 300
                          </div>
                          <div className="flex flex-row items-start justify-start py-0 px-px text-2xs-4 text-gray-300">
                            <div className="relative inline-block min-w-[35px]">
                              Others
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-end justify-start gap-[7.3px]">
                    <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap">
                      <div className="relative font-semibold inline-block min-w-[111px]">
                        Enrolled Courses
                      </div>
                      <div className="relative font-semibold text-mediumslateblue-100 inline-block min-w-[44px]">
                        See all
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[15.7px] text-left text-xs-7 text-mediumslateblue-100 mq650:flex-wrap">
                      <div className="flex-1 shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] bg-mediumpurple box-border overflow-hidden flex flex-row items-start justify-start pt-[13px] pb-3 pr-4 pl-5 gap-[26.7px] min-w-[155px] border-[2.6px] border-solid border-mediumslateblue-100">
                        <div className="h-[73.3px] w-[106.2px] flex flex-col items-start justify-start pt-0 px-0 pb-[41.3px] box-border gap-[15.5px]">
                          <div className="self-stretch relative leading-[15.63px] font-semibold">
                            Object oriented programming
                          </div>
                          <div className="rounded-[16.28px] bg-mediumslateblue-100 flex flex-row items-start justify-start py-[3.9px] px-[27px] text-white">
                            <div className="relative font-semibold inline-block min-w-[29px]">
                              View
                            </div>
                          </div>
                        </div>
                        <Image
                          className="h-[61px] w-[63.1px] relative object-contain"
                          alt=""
                          src="/icon-container@2x.png"
                          width={63.1}
                          height={61}
                        />
                      </div>
                      <div className="flex-1 shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] bg-mediumslateblue-200 overflow-hidden flex flex-row items-start justify-start pt-[15.7px] px-5 pb-[15.2px] box-border min-w-[155px]">
                        <div className="h-[73.3px] w-[133.5px] flex flex-col items-start justify-start pt-0 px-0 pb-[41.3px] box-border gap-[15.5px]">
                          <div className="w-[162.8px] flex flex-row items-start justify-start py-0 pr-0 pl-1.5 box-border">
                            <div className="flex-1 relative leading-[15.63px] font-semibold">
                              Fundamentals of database systems
                            </div>
                          </div>
                          <div className="rounded-[16.28px] bg-mediumslateblue-100 flex flex-row items-start justify-start py-[3.9px] px-[27px] text-white">
                            <div className="relative font-semibold inline-block min-w-[29px]">
                              View
                            </div>
                          </div>
                        </div>
                        <Image
                          className="h-[63.4px] w-[62.5px] relative"
                          alt=""
                          src="/group-16.svg"
                          width={62.5}
                          height={63.4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[306.8px] w-[191.2px] flex flex-col items-start justify-start pt-[7.9px] px-0 pb-0 box-border min-w-[191.2px] mq725:flex-1">
                  <div className="self-stretch flex flex-col items-end justify-start gap-[15.6px]">
                    <div className="flex flex-row items-start justify-start gap-[7.8px]">
                      <Image
                        className="h-[60.6px] w-[58px] relative rounded-[50%] object-cover min-h-[61px]"
                        loading="lazy"
                        alt=""
                        src="/ellipse-16@2x.png"
                        width={58}
                        height={60.6}
                      />
                      <Image
                        className="h-[60.6px] w-[58px] relative rounded-[50%] object-cover min-h-[61px]"
                        loading="lazy"
                        alt=""
                        src="/ellipse-17@2x.png"
                        width={58}
                        height={60.6}
                      />
                      <Image
                        className="h-[60.6px] w-[58px] relative rounded-[50%] object-cover min-h-[61px]"
                        loading="lazy"
                        alt=""
                        src="/ellipse-18@2x.png"
                        width={58}
                        height={60.6}
                      />
                    </div>
                    <div className="self-stretch flex flex-col items-end justify-start gap-[7.3px]">
                      <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                        <div className="relative font-semibold inline-block min-w-[78px]">
                          Daily notice
                        </div>
                        <div className="relative font-semibold text-mediumslateblue-100 inline-block min-w-[44px]">
                          See all
                        </div>
                      </div>
                      <div className="self-stretch shadow-[5.2px_5.2px_31.27px_5.21px_rgba(0,_0,_0,_0.08)] rounded-[15.63px] bg-white overflow-hidden flex flex-col items-start justify-start pt-[20.9px] px-5 pb-[9.1px] gap-[2.6px] text-left text-2xs-4">
                        <div className="relative font-semibold inline-block min-w-[109.4px]">
                          Prelim payment due
                        </div>
                        <div className="self-stretch relative text-gray-300">
                          Sorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </div>
                        <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[7px] text-mediumslateblue-100">
                          <div className="relative font-semibold inline-block min-w-[50px]">
                            See more
                          </div>
                        </div>
                        <div className="w-[109.4px] relative font-semibold flex items-center">
                          Exam schedule
                        </div>
                        <div className="self-stretch relative text-gray-300">
                          Norem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc vulputate libero et velit interdum, ac
                          aliquet odio mattis.
                        </div>
                        <div className="relative font-semibold text-mediumslateblue-100 inline-block min-w-[50px]">
                          See more
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
