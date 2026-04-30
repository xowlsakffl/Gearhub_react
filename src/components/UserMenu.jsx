import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BackDrop from './BackDrop';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logOutHandler = () => {
      dispatch(logOutUser(navigate));
    };
  
    return (
      <div className='relative z-30'>
        <div
        className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
          onClick={handleClick}
        >
          <Avatar alt='Menu' sx={{width: 24, height:24}} src=''/>
        </div>
        <Menu
          sx={{ width:"400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: {width: 160},
          }}
        >

          <Link to="/profile">
            <MenuItem className="flex gap-1" 
                onClick={handleClose}>
                    <span className='font-bold text-[16px] mt-1'>
                        {user?.username}
                    </span>
            </MenuItem>
          </Link>

          <Link to="/profile/orders">
            <MenuItem className="flex gap-1" 
                onClick={handleClose}>
                    <span className='font-semibold'>
                        주문 내역
                    </span>
            </MenuItem>
          </Link>

            <MenuItem className="flex gap-1" 
                onClick={logOutHandler}>
                    <div className='font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm'>
                    <IoExitOutline className='text-xl'/>
                    <span className='font-bold text-[16px] mt-1'>
                        로그아웃
                    </span>
                    </div>
            </MenuItem>

        </Menu>

        {open && <BackDrop />}
      </div>
    );
}

export default UserMenu