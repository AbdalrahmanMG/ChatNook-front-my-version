// import React from 'react'
// import { IoAddCircle } from "react-icons/io5";
// import { IoAddOutline } from "react-icons/io5";
// import Search from './Search';
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { GrNext } from "react-icons/gr";

// const Modal = () => {
//   return (
//     <>
//       <button
//         className="rounded-full"
//         onClick={() => document.getElementById("my_modal_5").showModal()}
//       >
//         {/* <IoAddOutline className='text-lg text-cyan-700' /> */}
//         <IoAddCircle className='text-3xl text-cyan-700' />
//       </button>
//       <dialog
//         id="my_modal_5"
//         className="modal modal-bottom sm:modal-middle w-1/4 overflow-auto"
//       >
//         <div className="modal-box h-64 w-full">
//           <div className='flex flex-col justify-between'>
//             <h3 className="font-bold text-xl mb-3">Contacts</h3>
//             <h6 className="text-gray-500 text-sm ms-3">Create Group</h6>
//           </div>
//           <Search />
//           <div className="modal-actionw-full">
//             <form method="dialog" className='w-full'>
//               <div className='btn-control flex justify-between mb-2'>
//                 <button className="text-2xl text-cyan-700"><IoMdCloseCircleOutline />
//                 </button>
//                 <button className="text-2xl text-cyan-700"><GrNext />
//                 </button>
//               </div>
//               <ul className='contact-list flex flex-col  w-full'>
//                 <li className='w-full border-b-2 pb-2 mb-2 outline-none flex text-center items-center justify-around'>
//                   <img className='w-14 rounded-full' src="https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face.png" alt="" />
//                   <p>Merna Awad</p>
//                   <div className="inline-flex items-center">
//                     <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="red">
//                       <input type="checkbox"
//                         className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-600 checked:bg-cyan-600 checked:before:bg-cyan-600 hover:before:opacity-10"
//                         id="red" />
//                       <span
//                         className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
//                           stroke="currentColor" stroke-width="1">
//                           <path fill-rule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clip-rule="evenodd"></path>
//                         </svg>
//                       </span>
//                     </label>
//                   </div>
//                 </li>
//                 <li className='w-full border-b-2 pb-2 mb-2 outline-none flex text-center items-center justify-around'>
//                   <img className='w-14 rounded-full' src="https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face.png" alt="" />
//                   <p>Merna Awad</p>
//                   <div class="inline-flex items-center">
//                     <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="red">
//                       <input type="checkbox"
//                         class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-600 checked:bg-cyan-600 checked:before:bg-cyan-600 hover:before:opacity-10"
//                         id="red" />
//                       <span
//                         class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
//                           stroke="currentColor" stroke-width="1">
//                           <path fill-rule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clip-rule="evenodd"></path>
//                         </svg>
//                       </span>
//                     </label>
//                   </div>
//                 </li>
//                 <li className='w-full border-b-2 pb-2 mb-2 outline-none flex text-center items-center justify-around'>
//                   <img className='w-14 rounded-full' src="https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face.png" alt="" />
//                   <p>Merna Awad</p>
//                   <div class="inline-flex items-center">
//                     <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="red">
//                       <input type="checkbox"
//                         class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-600 checked:bg-cyan-600 checked:before:bg-cyan-600 hover:before:opacity-10"
//                         id="red" />
//                       <span
//                         class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
//                           stroke="currentColor" stroke-width="1">
//                           <path fill-rule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clip-rule="evenodd"></path>
//                         </svg>
//                       </span>
//                     </label>
//                   </div>
//                 </li>
//                 <li className='w-full border-b-2 pb-2 mb-2 outline-none flex text-center items-center justify-around'>
//                   <img className='w-14 rounded-full' src="https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face.png" alt="" />
//                   <p>Merna Awad</p>
//                   <div class="inline-flex items-center">
//                     <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="red">
//                       <input type="checkbox"
//                         class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-600 checked:bg-cyan-600 checked:before:bg-cyan-600 hover:before:opacity-10"
//                         id="red" />
//                       <span
//                         class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
//                           stroke="currentColor" stroke-width="1">
//                           <path fill-rule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clip-rule="evenodd"></path>
//                         </svg>
//                       </span>
//                     </label>
//                   </div>
//                 </li>
//               </ul>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </>

//   )
// }

// export default Modal

