import React, { useState } from 'react'
import {Link} from 'react-router'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import avatarImg from "../assets/avatar.png"
import { useSelector } from 'react-redux';
const navigation = [
  {name:"Dashboard",href:"/dashboard"},
  {name:"Orders",href:"/order"},
  {name:"Cart Page",href:"/cart"},
  {name:"Check Out",href:"/checkout"}
]
function Navbar() {
  const [isDropdownOpen,setIsDropdownOpen] = useState(false)
  const cartItem = useSelector(state => state.cart.cartItem)
let currentUser = false;
  return (
    <div className='max-w-screen mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>
        <div className='flex items-center md:gap-16 gap-4'>
          <Link to="/home"><HiBars3CenterLeft className='size-6'/></Link>
          <div className='relative sm:w-85 w-50 space-x-2'>
          <CiSearch className='absolute  top-2 left-0.75'/>
          <input type="text" placeholder='Search here?' className=' bg-[#EAEAEA] py-1 md:px-8 px-6 rounded-md w-full focus:outline-none'/>
          </div>
        </div>
        <div className='flex relative items-center md:space-x-3 space-x-2'>
          <div className='relative top-0.5'>
            {
              currentUser? <> <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)}><img src={avatarImg} alt="logo" className={`size-7 rounded-full ${currentUser? 'ring-2 ring-blue-500':''}`}/>
              </button>
              {
                isDropdownOpen&&(
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-auto'>
                    <ul>
                    {navigation.map((item)=>(
                      <li key={item.name} onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>
                        <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>{item.name}</Link>
                      </li>
                    ))
                    }
                    </ul>
                  </div>
                )
              }
              </>  : <Link to="/login"><FaUserCircle className='size-7'/>
              </Link>
            }
          </div>
        <button className='hidden sm:block'>
        <CiHeart className='size-7'/>
        </button>
        <Link to="/cart" className='bg-amber-300 p-1 sm:px-6 px-2 flex items-center rounded-sm'>
        <CiShoppingCart className='size-6'/>{
          cartItem.length > 0 ? <span>{cartItem.length}</span>:<span>0</span>
        }</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
