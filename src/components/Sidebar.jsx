"use client"
import { usePathname } from "next/navigation";
import Link from 'next/link';

function Sidebar() {
  // const router=useRouter();
  const pathName=usePathname();
  console.log(pathName);
  return (
    <div>
      <nav className="left__navbar">
        <ul>
          <li className={pathName=='/'?"active":''}>
          <Link href="/">
            <svg
              width="34"
              height="34"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="33"
                height="33"
                rx="16.5"
                stroke="$color-text"
              />
              <path
                d="M12.0885 9.76364L11.0885 10.5445C9.57182 11.7289 8.81348 12.321 8.40674 13.156C8 13.991 8 14.9555 8 16.8846V18.9767C8 22.763 8 24.6562 9.17157 25.8325C10.1147 26.7793 11.5204 26.964 14 27V23.0057C14 22.0738 14 21.6078 14.1522 21.2403C14.3552 20.7502 14.7446 20.3609 15.2346 20.1579C15.6022 20.0057 16.0681 20.0057 17 20.0057C17.9319 20.0057 18.3978 20.0057 18.7654 20.1579C19.2554 20.3609 19.6448 20.7502 19.8478 21.2403C20 21.6078 20 22.0738 20 23.0057V27C22.4796 26.964 23.8853 26.7793 24.8284 25.8325C26 24.6562 26 22.763 26 18.9767V16.8846C26 14.9555 26 13.991 25.5933 13.156C25.1865 12.321 24.4282 11.7289 22.9115 10.5445L21.9115 9.76364C19.5521 7.92121 18.3724 7 17 7C15.6276 7 14.4479 7.92121 12.0885 9.76364Z"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Business Board</h2></Link>
          </li>
          <li className={pathName.includes('dashboard')?"active":''}>
          <Link href="/dashboard">
            <svg
              width="34"
              height="34"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="16.5" stroke="$color-text" />
              <rect
                x="1"
                y="1"
                width="10"
                height="10"
                rx="5"
                fill="#1FB789"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M20 7.5V9C20 10.4142 20 11.1213 20.4393 11.5607C20.8787 12 21.5858 12 23 12H24.5"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21V13C9 10.1716 9 8.75736 9.87868 7.87868C10.7574 7 12.1716 7 15 7H19.1716C19.5803 7 19.7847 7 19.9685 7.07612C20.1522 7.15224 20.2968 7.29676 20.5858 7.58579L24.4142 11.4142C24.7032 11.7032 24.8478 11.8478 24.9239 12.0315C25 12.2153 25 12.4197 25 12.8284V21C25 23.8284 25 25.2426 24.1213 26.1213C23.2426 27 21.8284 27 19 27H15C12.1716 27 10.7574 27 9.87868 26.1213C9 25.2426 9 23.8284 9 21Z"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 16H21M13 19H21M13 22H17.1708"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Quotation Request</h2></Link>
          </li>
          <li className="">
          <Link href="/">
            <svg
              width="34"
              height="34"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="16.5" stroke="$color-text" />
              <rect
                x="1"
                y="1"
                width="10"
                height="10"
                rx="5"
                fill="#1FB789"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M18 27C17.1818 27 16.4002 26.6588 14.8369 25.9764C13.0123 25.18 11.6155 24.5703 10.6465 24H7M18 27C18.8182 27 19.5998 26.6588 21.1631 25.9764C25.0544 24.2779 27 23.4286 27 22V11.5M18 27V16M9 11.5V14.5"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3259 14.6914L11.4047 13.2779C9.80157 12.5021 9 12.1142 9 11.5C9 10.8858 9.80157 10.4979 11.4047 9.72215L14.3259 8.30862C16.1288 7.43621 17.0303 7 18 7C18.9697 7 19.8712 7.4362 21.6741 8.30862L24.5953 9.72215C26.1984 10.4979 27 10.8858 27 11.5C27 12.1142 26.1984 12.5021 24.5953 13.2779L21.6741 14.6914C19.8712 15.5638 18.9697 16 18 16C17.0303 16 16.1288 15.5638 14.3259 14.6914Z"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.1366 9.01562L12.8672 13.9848"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 18H10"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 21H10"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Purchase Request</h2></Link>
          </li>
          <span className="sub-head">Networks</span>
          <li className=""><Link href="/">
            <svg
              width="34"
              height="34"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="16.5" stroke="$color-text" />
              <path
                d="M10.636 23.3637C9.00736 21.735 8 19.485 8 16.9998C8 12.0292 12.0294 7.99976 17 7.99976C19.4853 7.99976 21.7353 9.00711 23.364 10.6358M25.2941 13.4998C25.7487 14.5756 26 15.7583 26 16.9998C26 21.9703 21.9706 25.9998 17 25.9998C15.7586 25.9998 14.5759 25.7484 13.5 25.2938"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.8292 8.82142C23.5323 7.13929 25.7205 6.51927 26.6005 7.39779C28.1408 8.93534 25.0911 14.4807 19.7889 19.7837C14.4866 25.0867 8.93971 28.1393 7.39946 26.6017C6.52414 25.7279 7.13121 23.5598 8.79165 20.8773"
                stroke="$color-text"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>Manage Networks</h2></Link>
          </li>
          <br></br>
          <li>
            <div className="left__navbar__card">
              <div className="ellipse">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="17.5"
                    cy="16.5"
                    r="11.5"
                    fill="url(#paint0_radial_1_3273)"
                  />
                  <circle cx="15.5" cy="15.5" r="3.5" fill="white" />
                  <path
                    d="M7.04505 22.9549C5.0092 20.9191 3.75 18.1065 3.75 15.0001C3.75 8.78679 8.7868 3.75 15 3.75C18.1066 3.75 20.9191 5.00919 22.955 7.04504M25.3676 10.625C25.9359 11.9699 26.25 13.4482 26.25 15.0001C26.25 21.2132 21.2133 26.2501 15 26.2501C13.4482 26.2501 11.9699 25.9358 10.625 25.3675"
                    stroke="#BD6112"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.7865 4.77708C23.1654 2.67442 25.9006 1.8994 27.0006 2.99755C28.5138 4.50797 26.4833 9.11254 22.3274 14.2325M4.73956 19.8469C2.66401 23.2001 1.90517 25.9102 2.99932 27.0024C4.55097 28.5514 9.35558 26.3737 14.6314 22.0002"
                    stroke="#BD6112"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.292 17.2915L19.167 19.1665"
                    stroke="#BD6112"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.333 14.5835C18.333 12.5124 16.6541 10.8335 14.583 10.8335C12.5119 10.8335 10.833 12.5124 10.833 14.5835C10.833 16.6546 12.5119 18.3335 14.583 18.3335C16.6541 18.3335 18.333 16.6546 18.333 14.5835Z"
                    stroke="#BD6112"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_1_3273"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(10.5 12.5) rotate(38.991) scale(13.5093)"
                    >
                      <stop stopColor="#FFEFE1" />
                      <stop offset="1" stopColor="#FECDA3" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              
              <h2>Find in Business Network</h2>
              <hr/>
              <p>You can find the current supply chain by using GST/ Name / Phone number</p>
              <input placeholder="Enter Here"></input>
              <button className='primary__btn'>Search Now <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.125 13.125L16.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15 8.25C15 4.52208 11.978 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.978 4.52208 15 8.25 15C11.978 15 15 11.978 15 8.25Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
</svg></button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Sidebar;
