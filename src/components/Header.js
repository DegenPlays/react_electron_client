

// export default function Header(){
//     // const router = useRouter();

//     const menuItems = [
//         {
//           href: '/',
//           title: 'Homepage',
//         },
//         {
//           href: '/dapp',
//           title: 'Dapp',
//         },
//         {
//           href: '/works',
//           title: 'How It Works',
//         },
//         {
//           href: 'https://testnet.bscscan.com/address/0xAC3436B3aFAd4D048ba51DA4708d14eD7E490Ff0',
//           title: 'Contract',
//           external: true
//         }
//       ];


//     return(
//         <div>
//             {menuItems.map(({ href, title, external }) => (
//             <div key={title} >
//               {external ? (
//                 <a href={href} target="_blank" rel="noopener noreferrer" className="rounded cursor-pointer">
//                   <button style={{width:'max-content',color: 'var(--color-grey-300)'}}>
//                     {title}
//                   </button>
//                 </a>
//               ) : (
//                 <Link href={href}>
//                   <button
//                     onClick={() => changePage(href)}
//                     className={`rounded cursor-pointer ${router.asPath === href && 'text-white'}`}
//                     style={{width:'max-content',color: 'var(--color-grey-300)'}}
//                   >
//                     {title}
//                   </button>
//                 </Link>
//               )}
//             </div>
//           ))}
//         </div>
//     )
// }