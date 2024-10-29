import Image from "next/image";
import Link from "next/link";


function Navbar() {
  return (
    <div>
      <nav>
        <div className="container mx-auto my-[1rem]">
          <div className="flex justify-between uppercase items-center">
          
           <Link href="/" className="text-5xl font-bold">
              <Image
                src='/assests/olopo-logo.png'
                alt="Logo"
                width={144}
                height={45}
              />
            </Link>
            <div className="gap-5 items-center md:flex hidden">
              <Link href="/" className="notification mr-10">
                <div className="bg-[#2DDBA726] rounded-xl p-3.5">
                  <Image
                    src="/assests/icons/notifications.svg"
                    alt="notifications"
                    width={25}
                    height={26}
                  />
                </div>
                <div className="count">
                  <span>27</span>
                </div>
              </Link>
              <div className="w-[2px] h-14 flex-shrink-0 rounded bg-[#dedfe3] mr-10"></div>
              <div className="text-[#464255] text-[16px] font-normal leading-normal mr-4">
                <p>
                  Hello,{" "}
                  <span className="text-[#464255] text-[16px] font-semibold leading-normal">
                    MS Market
                  </span>
                </p>
              </div>
              <div className="">
              <Image
                    src="/assests/header-icons.png"
                    alt="header-icon" 
                    width={44}
                    height={44}
                  />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
