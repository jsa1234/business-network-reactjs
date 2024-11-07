"use client"
import { usePathname } from "next/navigation";
import Link from 'next/link';
import HomeIcon from '../../public/assests/icons/home.svg';
import QuotationIcon from '../../public/assests/icons/quotation.svg';
import PurchaseIcon from '../../public/assests/icons/purchase.svg';
import ManageNetIcon from '../../public/assests/icons/managenetwork.svg';
import SaturnSmIcon from '../../public/assests/icons/saturn-sm.svg';
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
            <HomeIcon/>
            <h2>Business Board</h2></Link>
          </li>
          <li className={pathName.includes('quotationrequest')?"active":''}>
          <Link href="/quotationrequest">
            <QuotationIcon/>
            <h2>Quotation Request</h2></Link>
          </li>
          <li className={pathName.includes('purchaserequest')?"active":''}>
          <Link href="/purchaserequest">
            <PurchaseIcon/>
            <h2>Purchase Request</h2></Link>
          </li>
          <span className="sub-head">Networks</span>
          <li className={pathName.includes('managenetwork')?"active":''}>
          <Link href="/managenetwork">
            <ManageNetIcon/>
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
