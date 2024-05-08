"use client"
import React, { useState } from "react";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Testheader() {
    let Links = [
        { name: "Dashboard", link: "/" },
        { name: "SERVICE", link: "/" },
        { name: "ABOUT", link: "/" },
        { name: "BLOG'S", link: "/" },
        { name: "CONTACT", link: "/" },
      ];
      let [open, setOpen] = useState(false);
      let icon;
    if (open) {
        icon = <Menu />
      } else {
    
        icon = <Menu />
      }
    return (
        <header >
          <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
              <div >
    
                FastLeads
              </div>
    
              <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
              
    
                {icon}
               
              </div>
    
              <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                {
                  Links.map((link) => (
                    <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                      <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                    </li>
                  ))
                }
                <Button className="ml-0 md:ml-5">
                  Get Started
                </Button>
              </ul>
            </div>
          </div>
    
        </header>
    
      );
}

