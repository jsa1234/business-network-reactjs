import Image from 'next/image';
import '../styles/main.scss';
// import search from '/assets/images/'
function Page(){
return <>
   <Image src='/assets/images/search.svg'
   width={200}
   height={200}
   alt='adm'
   ></Image>
   Dashboard
</>
}
export default Page;