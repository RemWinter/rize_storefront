'use client'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { IoMenuSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setDimensions, setNavVisible, setScrollOffsetY } from '../redux/globalSlice'
import Divider from '@mui/material/Divider';
import { MdLogin, MdLogout } from "react-icons/md";
import { IoShirtOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { TbMessage2Question } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import UnderlineDivAnimated from '../common/UnderlineDivAnimated/UnderlineDivAnimated';
import { getInitialUserInfoProcess, logoutProcess } from '../redux/userSlice';
import { Alert, Avatar, Snackbar } from '@mui/material';
import { setSnackbarIsOpen, setSnackbarSeverity, setSnackbarText } from '../redux/snackbarSlice';

interface Dimensions {
  x:number;
  y:number;
}

interface NavOption {
  text:string;
  icon:ReactElement;
  link:string;
}

interface NavProps {
  page?:string;
}

const navOptions: Record<string, NavOption> = {
  'login': {
    text: 'Login',
    icon: <MdLogin size={19}/>,
    link: '/login'
  },
  'clothing': {
    text: 'Clothing',
    icon: <IoShirtOutline size={19}/>,
    link: '/products'
  },
  'accessories': {
    text: 'Accessories',
    icon: <IoPhonePortraitOutline size={19}/>,
    link: '#'
  },
  'contact': {
    text: 'Contact',
    icon: <TbMessage2Question size={19}/>,
    link: '#'
  },
  'myAccount': {
    text: 'My Account',
    icon: <TbUser size={19}/>,
    link: '#'
  },
}

const Navbar:React.FC<NavProps> = (props) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [atTop, setAtTop] = useState<boolean>(true);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const mobileNavOpenRef = useRef<boolean>(false)
  const [windowDimensions, setWindowDimension] = useState<Dimensions | null>(null)
  const [initialLoad, setInitialLoad] = useState<boolean>(true)
  const [activeNavOptions, setActiveNavOptions] = useState<NavOption[]>([])

  const nav = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch()
  const {email, firstName, lastName, isStaff, userLoggedIn} = useAppSelector(state => state.userSlice)
  const {dimensions} = useAppSelector(state => state.globalSlice)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    dispatch(setScrollOffsetY(currentScrollPos))
    setAtTop(window.scrollY > 50 ? false : true)
    mobileNavOpenRef.current ? setVisible(true) : setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    setActiveNavOptions(() => {
      const arr: NavOption[] = []
      userLoggedIn ? arr.push(navOptions.myAccount) : arr.push(navOptions.login)
      props.page !== 'products' && arr.push(navOptions.clothing)
      arr.push(navOptions.accessories, navOptions.contact)
      return arr
    })
  }, [userLoggedIn, props.page])

  useEffect(() => {
    dispatch(setNavVisible(atTop))
  }, [atTop])
  
  const handleResize = () => {
    const dimension = {x: window.innerWidth, y: window.innerHeight}
    // setWindowDimension(dimension)
    // dispatch(setDimensions(dimension))
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(prev => !prev)
  }

  useEffect(() => {
    const dimensions = {x:window.innerWidth, y:window.innerHeight}
    // dispatch(setDimensions(dimensions))
    // setWindowDimension(dimensions)
    window.addEventListener('resize', handleResize)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          if (mutation.target instanceof HTMLElement) {
            const targetElement = mutation.target as HTMLElement;
            targetElement.style.top === '0px' ? dispatch(setNavVisible(true)) : dispatch(setNavVisible(false));
          }
        }
      });
    });

    if (nav.current) {
      observer.observe(nav.current, { attributes: true });
    }

    dispatch(getInitialUserInfoProcess()).unwrap()
    .then(res => {

    })

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
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

  return (
    <nav 
      ref={nav}
      className={styles.navbarContainer} 
      style={{ 
        top: visible ? '0' : '-200px', 
        // backgroundColor: atTop ? 'rgba(0,0,0,0)' : 'rgba(80, 100, 115, 0.5)',
        backgroundColor: atTop ? 'rgba(0,0,0,0)' : 'rgb(67 67 67)',
        padding: atTop ? '20px 0' : '8px 0',
        height: atTop ? '104px' : '70px',
        backdropFilter: atTop ? 'blur(0px)' : 'blur(5px)'
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
              fill
              objectFit='contain'
              // width={60}
              // height={60}
            />
        </div>
        {dimensions && props.page !== 'products' && dimensions.x >= 960  ? 
          <NavItems navOptions={activeNavOptions} initialLoad={initialLoad} setInitialLoad={setInitialLoad}/> :
          <MobileNav open={mobileNavOpen} 
            toggleOpen={toggleMobileNav} 
            navOptions={activeNavOptions} 
            windowDimensions={dimensions}
            atTop={atTop}
            loggedIn={userLoggedIn}
            firstName={firstName}
          />
        }
    </nav>
  )
}

interface NavItemsProps {
  navOptions: Record<string, any>[];
  initialLoad: boolean;
  setInitialLoad: (bool:boolean) => void
}

const NavItems: React.FC<NavItemsProps> = ({navOptions, initialLoad, setInitialLoad}) => {
  const navItemsDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        if (navItemsDiv.current) {
          // navItemsDiv.current.style.opacity = '1'
          navItemsDiv.current.classList.add(styles.visible)
        }
      }, 500);
      setInitialLoad(false)
    }
  }, [])

  return (
    <div ref={navItemsDiv} className={`${styles.navItemsContainer}`}>
      { navOptions.map((option, index) => (
        <UnderlineDivAnimated key={index} gap={5}>
          <a href={option.link} className={styles.navOption}>
            {option.text}
          </a>
        </UnderlineDivAnimated>
      ))
      }
    </div>
  )
}

interface MobileNavProps {
  open: boolean;
  toggleOpen: Function;
  navOptions: Record<string, any>[];
  windowDimensions: Dimensions | null;
  atTop: boolean;
  loggedIn: boolean;
  firstName: string
}

const MobileNav: React.FC<MobileNavProps> = ({open, toggleOpen, navOptions, windowDimensions, atTop, loggedIn, firstName}) => {
  const [alert, setAlert] = useState<'error' | 'success' | null>(null)
  const hamBurgermenu = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutProcess())
      .unwrap()
      .then(() => {
        toggleOpen()
        dispatch(setSnackbarText('Successfully logged out'))
        dispatch(setSnackbarSeverity('success'))
        dispatch(setSnackbarIsOpen(true))
      })
  }

  useEffect(() => {
    if (hamBurgermenu.current) {
      hamBurgermenu.current.style.opacity = '1'
    }
    const handleClickOutside = (e:any) => {
      // If the menu is open and the click is outside the menu, close the menu
      if (menuRef.current && !menuRef.current.contains(e.target) && !hamBurgermenu.current?.contains(e.target)) {
        toggleOpen()
      }
    }
    if (open) {
        document.addEventListener('mousedown', handleClickOutside);
      }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open])

  return (
    <>
      <div ref={hamBurgermenu} className={styles.menuIconContainer}>
        <IoMenuSharp 
        onClick={() => toggleOpen()}
          color='#fff'
          size={30}
      />
      </div>
      {windowDimensions &&
        <div 
          ref={menuRef}
          style={{
            right: open ? '0' : windowDimensions.x < 960 ? '-100%' : '-50%', 
            backgroundColor: open ? 'var(--color-retro-blue)' : 'rgba(0,0,0,0)', maxWidth: '300px'}}
          className={styles.mobileNavContainer}
        >
          <div style={{width:'100%', height: atTop ? '104px' : '70px', transition: 'all 0.5s'}}/>
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
          {loggedIn &&
          <>
            <Divider/>
            <div className={styles.menuItemsContainer}>
              <div className={styles.mobileNavLink} onClick={handleLogout}>
                <MdLogout size={19}/>
                <span className={styles.mobileNavLinkText} id={styles.logoutNavText}>Logout</span>
              </div>
            </div>
          </>
          }
        </div>
      }
      
    </>
  )
}

export default Navbar