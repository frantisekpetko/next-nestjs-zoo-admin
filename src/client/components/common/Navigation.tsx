/*
'use client'

import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem} from '@mui/material';
import { AccountCircle, Clear as ClearIcon} from '@mui/icons-material';

import { useStoreActions } from 'my-store';
import Link from 'next/link';
import { useScreenDetector } from '../../hooks/useScreenDetector';
import styled from 'styled-components';
import Flex from 'components/Flex';
import StyledMQ, { BreakpointsString } from 'tools/styledMQ';


const CustomizedAppBar= styled(AppBar)`
  height: 4em;
  min-height: 4em;
  height: auto;
  background-color: darkolivegreen !important;
  color: white;
`;

const IconButtonMenu= styled(IconButton)`
  display: none;
  ${StyledMQ([
    {
        breakpoint: BreakpointsString.XS,
        rules: `
            display: inline-block !important;
            `
    },
    {
        breakpoint: BreakpointsString.SM,
        rules: `
            display: none !important;
            `
    }
])}
`


const CustomizedLink= styled(Link)`
  color: white;
  text-decoration: none !important;
  display: inline;
  ${StyledMQ([
    {
        breakpoint: BreakpointsString.XS,
        rules: `
            display: none;
            `
    },
    {
        breakpoint: BreakpointsString.SM,
        rules: `
            display: inline;
            `
    }
])}
`;

const AppLink= styled(Link)`
    color: white;
    text-decoration: none;
`

const AppHeading= styled.span`
    font-size: 1.25em;
    font-weight: 400 !important;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
`;

const Logo= styled.span`
    background-color: transparent;
    overflow: hidden;
    height: 3rem;
    width: 3rem;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    ${StyledMQ([
    {
        breakpoint: BreakpointsString.XS,
        rules: `
            display: none;
        `
    },
    {
        breakpoint: BreakpointsString.SM,
        rules: `
            display: flex;
        `
    }
])} 
`;

const Sidenav= styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  text-align: center;
  background-color: darkolivegreen;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;


  & a {
    padding: 8px 32px 8px 32px;
    text-decoration: none;
    font-size: 25px;

    color: #111;
    display: block;
    transition: 0.3s;
  }

  & a:hover { 
    background-color: #000000;
    color: darkolivegreen;
  }
`;

const CloseButton= styled.a`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 36px;
  padding-right: 0.85em;

  &:hover {
    background-color: #000000;
    color: darkolivegreen;
  }
`

const FlexContainer= styled(Flex)`
    ${StyledMQ([
        {
            breakpoint: BreakpointsString.XS,
            rules: `
            display: none;
        `
        },
        {
            breakpoint: BreakpointsString.SM,
            rules: `
            line-height: 
        `
        }
    ])} 
`

export default function Navigation() {
    //const load = useStoreActions((actions) => actions.user.loadTokenToMemory);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);

    let token: string | null = null;

    useEffect(() => {
        token = localStorage.getItem('token')
    }, [])

    const handleFullscreenMenu = () => {
        //console.log(open);
        setOpen(!open);
    };

    const logOut = useStoreActions((actions) => actions?.user?.logOut);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        if (token != null) {
            console.log('tokenx', token);
        }
        setAnchorEl(null);

        logOut();
        //load();

        window.location.reload();
        //navigate.replace('/');
    };

    return (
        <div>
            <Sidenav style={open ? { width: '100%', zIndex: 9999999 } : { width: '0' }}>
                <CloseButton href={"#"} onClick={() => handleFullscreenMenu()}>
                    <ClearIcon />
                </CloseButton>
                {token !== null ? (
                    <>
                        <Link href="/" onClick={() => handleFullscreenMenu()}>
                            HomePage
                        </Link>
                        <Link href="/animals" onClick={() => handleFullscreenMenu()}>
                            Animals
                        </Link>
                        <Link href="/animals/create" onClick={() => handleFullscreenMenu()}>
                            Create New Animal
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" onClick={() => handleFullscreenMenu()}>
                            Login
                        </Link>
                        <Link href="/register" onClick={() => handleFullscreenMenu()}>
                            Register
                        </Link>
                    </>
                )}
            </Sidenav>

            <AppBar
                position='fixed'
                className={`
                    h-16 
                    min-h-16 
                    bg-[darkolivegreen] 
                    text-white 
                `}
                sx={{
                    height: '4em',
                    minHeight: '4em',
                    backgroundColor: 'darkolivegreen',
                    color: 'white',
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
  =

                    <Typography variant="h6" component="div">

                        <AppLink href="/">
                            <Flex direction='row' styles={{ gap: '0.5em', padding: '0.6em', lineHeight: '2.5em' }}>
                                <Logo className='ra ra-lion' />
                                <AppHeading>Zoo Admin</AppHeading>
                            </Flex>
                        </AppLink>
                    </Typography>

                    <Flex direction='row' justifyContent='flex-end' styles={{ lineHeight: '3em' }}>
                        {token !== null ? (
                            <Box>
                                <CustomizedLink href={'/animals'}>
                                    <Button color="inherit">List of Animals</Button>
                                </CustomizedLink>
                                <CustomizedLink href={'/animals/create'}>
                                    <Button color="inherit">Create New Animal</Button>
                                </CustomizedLink>

                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(e) => handleMenu(e)}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>{sessionStorage.getItem('username') !== null ? sessionStorage.getItem('username') : 'Account'}</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Box>
                                <CustomizedLink href={'/login'} className={'customized-link'}>
                                    <Button color="inherit">Login</Button>
                                </CustomizedLink>
                                <CustomizedLink href={'/register'} className={'customized-link'}>
                                    <Button color="inherit">Register</Button>
                                </CustomizedLink>
                            </Box>
                        )}

                        <IconButtonMenu size="large" edge="start" color="inherit" aria-label="menu" sx={{ ml: 0 }} onClick={() => handleFullscreenMenu()}>
                            <MenuIcon />
                        </IconButtonMenu>
                    </Flex>
                </Toolbar>
            </AppBar>
        </div>
    );
}
*/
'use client';

import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, Clear as ClearIcon } from '@mui/icons-material';
import { useStoreActions, useStoreState } from 'my-store';
import Link from 'next/link';
import { useScreenDetector } from 'hooks/useScreenDetector';

export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const token = useStoreState((state) => state.user.token);
  const loadTokenToMemory = useStoreActions((actions) => actions.user.loadTokenToMemory);

  useEffect(() => {
    loadTokenToMemory();
    console.log('auth', token);
  }, []);

  const {isMobile, isTablet, isDesktop} = useScreenDetector();
  //const [token, setToken] = React.useState<string | null>(null);
  //const loadTokenToMemory = useStoreActions((actions) => actions?.user?.loadTokenToMemory);
  //const token = useStoreState((state) => state?.user?.token);


  const handleFullscreenMenu = () => {
    setOpen(!open);
  };

  const logOut = useStoreActions((actions) => actions?.user?.logOut);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (token != null) {
      console.log('tokenx', token);
    }
    setAnchorEl(null);
    logOut();
    window.location.reload();
  };

  return (
      <div
          className={`
            pt-16`
          }
      >
      {/* Sidebar Navigation */}
      <div
        className={`
          fixed 
          top-0 
          left-0 
          h-full 
          bg-darkolivegreen 
          overflow-hidden 
          transition-all 
          duration-500 
          flex
          flex-col
          align-center
          items-center
          z-[9999]
          ${open ? 'w-full h-[100vh]' : 'w-0'}
        `}
      >
        <a
          href="#"
          onClick={() => handleFullscreenMenu()}
          className="
            absolute 
            top-0 
            right-0 
            text-3xl 
            p-4
          "
        >
          <ClearIcon />
        </a>
        {token !== null ? (
          <>
            <Link
              href="/"
              onClick={() => handleFullscreenMenu()}
              className="
                flex
                p-4 
                text-xl 
                text-white
                hover:bg-white
                hover:text-black
                w-full
                justify-center
                mt-[5rem]
              "
            >
              HomePage
            </Link>
            <Link
              href="/animals"
              onClick={() => handleFullscreenMenu()}
              className="
                flex
                p-4 
                text-xl 
                text-white
                hover:bg-white
                hover:text-black
                w-full
                justify-center
              "
            >
              Animals
            </Link>
            <Link
              href="/animals/create"
              onClick={() => handleFullscreenMenu()}
              className="
                flex
                p-4 
                text-xl 
                text-white
                hover:bg-white
                hover:text-black
                w-full
                justify-center
              "
            >
              Create New Animal
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={() => handleFullscreenMenu()}
              className="
                flex 
                p-4 
                text-xl 
                text-white
               hover:bg-white
                hover:text-black
                w-full
                justify-center
              "
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => handleFullscreenMenu()}
              className="
                flex 
                p-4 
                text-xl 
                text-white
               hover:bg-white
                hover:text-black
                w-full
                justify-center
              "
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          height: '4em',
          minHeight: '4em',
          backgroundColor: 'darkolivegreen',
          color: 'white',
        }}
        className="
          h-16 
          bg-darkolivegreen 
          text-white
        "
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            className="
              flex 
              items-center
            "
          >
            <Link
              href="/"
              className="
                flex 
                items-center 
                text-white
              "
            >
              <span className="
                bg-transparent 
                h-12 
                w-12 
                text-2xl 
                items-center 
                justify-center
                hidden
                sm:hidden
                md:flex
                lg:flex
                xl:flex
              ">
                {/* You can replace this with your logo or icon */}
                <span className="ra ra-lion text-5xl"/>
              </span>
              <span className="
                ml-2 
                text-lg 
                font-normal
              ">
                Zoo Admin
              </span>
            </Link>
          </Typography>

          <div className="
                flex 
                items-center
              ">
            {token !== null ? (
              <Box className="
                flex 
                items-center
              "
              sx={{display: 'flex', 'alignItems': 'center' }}
              >
                <Link
                  href="/animals"
                  className="
                    text-white
                    hidden
                    sm:hidden
                    md:block
                    lg:block
                    xl:block

                  "
                >
                  <Button
                    color="inherit"
                    sx={{
                      color: 'white',
                    }}
                  >
                    List of Animals
                  </Button>
                </Link>
                <Link
                  href="/animals/create"
                  className="
                    text-white
                    hidden
                    sm:hidden
                    md:block
                    lg:block
                    xl:block
                  "
                >
                  <Button
                    color="inherit"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Create New Animal
                  </Button>
                </Link>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => handleMenu(e)}
                  sx={{
                    color: 'white',
                  }}
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {localStorage.getItem('username') !== null
                      ? localStorage.getItem('username')
                      : 'Account'}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Link
                    href="/login"
                    className="
                    text-white
                    hidden
                    sm:hidden
                    md:flex
                    lg:flex
                    xl:flex
                  "
                >
                  <Button
                    color="inherit"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href="/register"
                  className="
                    text-white
                    hidden
                    sm:hidden
                    md:flex
                    lg:flex
                    xl:flex
                  "
                >
                  <Button
                    color="inherit"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            )}

            <IconButton
              size="large"
              edge="start"
              sx={{
                color: 'white',
                marginLeft: '0.5rem',
                display: isMobile ? 'flex' : 'none'
              }}
              aria-label="menu"
              onClick={() => handleFullscreenMenu()}
              className="
                flex
                sm:flex
                md:hidden
                lg:hidden
                xl:hidden
                ml-[0.5rem]
              "
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
