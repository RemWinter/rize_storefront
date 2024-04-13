'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { IoMenuSharp } from "react-icons/io5";
import { useAppDispatch } from '../redux/store'
import { setDimensions } from '../redux/globalSlice'
import Divider from '@mui/material/Divider';
import { MdLogin } from "react-icons/md";
import { IoShirtOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { TbMessage2Question } from "react-icons/tb";

interface Dimentions {
  x:number;
  y:number;
}
const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [atTop, setAtTop] = useState<boolean>(true);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const mobileNavOpenRef = useRef<boolean>(false)
  const [windowDimensions, setWindowDimension] = useState<Dimentions | null>(null)
  const dispatch = useAppDispatch()
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setAtTop(window.scrollY > 50 ? false : true)
    mobileNavOpenRef.current ? setVisible(true) : setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  
  const handleResize = () => {
    const dimension = {x: window.innerWidth, y: window.innerHeight}
    setWindowDimension(dimension)
    dispatch(setDimensions(dimension))
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(prev => !prev)
  }

  useEffect(() => {
    const dimensions = {x:window.innerWidth, y:window.innerHeight}
    dispatch(setDimensions(dimensions))
    setWindowDimension(dimensions)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  useEffect(() => {
    mobileNavOpenRef.current = mobileNavOpen
  }, [mobileNavOpen])

  const navOptions: Record<string, any>[] = [
    {
      text: 'Login',
      icon: <MdLogin size={19}/>,
      link: '#'
    },
    {
      text: 'Clothing',
      icon: <IoShirtOutline size={19}/>,
      link: '/products?clothing'
    },
    {
      text: 'Accessories',
      icon: <IoPhonePortraitOutline size={19}/>,
      link: '#'
    },
    {
      text: 'Contact',
      icon: <TbMessage2Question size={19}/>,
      link: '#'
    },
  ]
  return (
    <nav 
      className={styles.navbarContainer} 
      style={{ 
        top: visible ? '0' : '-200px', 
        backgroundColor: atTop ? 'rgba(0,0,0,0)' : '#506473',
      }}>
        <div 
          className={styles.logoContainer} 
          style={{
            // filter: (windowDimensions?.x <= 1050) && atTop ? 'drop-shadow(#000000 1px 1px 1px)' : 'none',
            transition:'all 0.5s'
          }}
          onClick={() => window.location.assign('/')}
        >
          <Image
              src='/rize_logo4.png'
              alt='Logo'
              width={60}
              height={60}
            />
        </div>
        {windowDimensions && windowDimensions.x > 960 ? 
          <NavItems navOptions={navOptions}/> :
          <MobileNav open={mobileNavOpen} 
            toggleOpen={toggleMobileNav} 
            navOptions={navOptions} 
            windowDimensions={windowDimensions}
          />
        }
    </nav>
  )
}

interface NavItemsProps {
  navOptions: Record<string, any>[]
}

const NavItems: React.FC<NavItemsProps> = ({navOptions}) => {
  return (
    <div className={styles.navItemsContainer}>
      { navOptions.map((option, index) => (
        <div key={index}>
          <a href={option.link} className={styles.navOption}>
            {option.text}
          </a>
        </div>
      ))
      }
    </div>
  )
}

interface MobileNavProps {
  open: boolean;
  toggleOpen: Function;
  navOptions: Record<string, any>[];
  windowDimensions: Dimentions | null;
}

const MobileNav: React.FC<MobileNavProps> = ({open, toggleOpen, navOptions, windowDimensions}) => {

  return (
    <>
      <div className={styles.menuIconContainer}>
        <IoMenuSharp 
        onClick={() => toggleOpen()}
          color='#fff'
          size={30}
      />
      </div>
      {windowDimensions &&
        <div 
          style={{
            right: open ? '0' : windowDimensions.x < 960 ? '-100%' : '-50%', 
            backgroundColor: open ? 'var(--color-retro-blue)' : 'rgba(0,0,0,0)', maxWidth: '300px'}}
          className={styles.mobileNavContainer}
        >
          <div style={{width:'100%', height: '104px'}}/>
          <Divider/>
          <div className={styles.menuItemsContainer}>
            {navOptions.map((item, index) => (
              <div className={styles.mobileNavLinkContainer} key={index} onClick={() => toggleOpen()}>
                <a className={styles.mobileNavLink} href={item.link}>
                  {item.icon}
                  <span className={styles.mobileNavLinkText}>{item.text}</span>
                </a>
                {/* <Divider/> */}
              </div>
            ))}
          </div>
        </div>
      }
      
    </>
  )
}

export default Navbar