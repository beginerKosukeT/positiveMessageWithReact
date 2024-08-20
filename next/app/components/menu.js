'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import checkLoginUser from '../utils/checkLoginUser';

const Menu = ({ open, setOpen }) => {
  const [loginUser, setLoginUser] = useState({
    _id: '',
    name: '',
    email: '',
    icon: '',
  });
  useEffect(() => {
    const checkToken = async () => {
      const loginUser = await checkLoginUser();
      setLoginUser({
        _id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        icon: loginUser.icon,
      });
    };
    checkToken();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 210 }} role='presentation' onClick={toggleDrawer(false)}>
      <div className='basic-font-drawer margin-drawer'>一般ユーザー</div>
      <List>
        {[
          {
            text: '新作',
            link: '/',
            icon: <FiberNewIcon sx={{ fontSize: 35 }} color='primary' />,
          },
          {
            text: '人気の投稿',
            link: '/item/bests',
            icon: <ThumbUpAltIcon sx={{ fontSize: 35 }} color='primary' />,
          },
          {
            text: '検索',
            link: '/item/search',
            icon: <SearchIcon sx={{ fontSize: 35 }} color='primary' />,
          },
          {
            text: '新規ユーザー登録',
            link: '/user/register',
            icon: <PersonAddIcon sx={{ fontSize: 35 }} color='primary' />,
          },
        ].map((item, index) => (
          <Link href={item.link} key={index}>
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: 'black',
                    fontWeight: 'medium',
                    variant: 'h5',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <div className='basic-font-drawer margin-drawer'>登録済みユーザー</div>
      <List>
        {[
          {
            text: 'ログイン',
            link: '/user/login',
            icon: <LoginIcon sx={{ fontSize: 35 }} color='primary' />,
          },
          {
            text: 'マイページ',
            link: `/item/mypage/${loginUser._id}`,
            icon: <PersonIcon sx={{ fontSize: 35 }} color='primary' />,
          },
          {
            text: '新規投稿',
            link: '/item/create',
            icon: <CreateIcon sx={{ fontSize: 35 }} color='primary' />,
          },
        ].map((item, index) => (
          <Link href={item.link} key={index}>
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: 'black',
                    fontWeight: 'medium',
                    variant: 'h5',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      className='color-light-blue'
      PaperProps={{
        sx: { backgroundColor: 'lightblue' },
      }}
    >
      {DrawerList}
    </Drawer>
  );
};

export default Menu;
