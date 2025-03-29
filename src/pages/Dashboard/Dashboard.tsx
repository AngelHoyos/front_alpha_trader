import React from 'react';
import FixedDrawer from '../../components/FixedDrawer/FixedDrawer';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { useNavigates } from '../../hooks/useNavigates';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { goTo } = useNavigates();
  return (
    <Box sx={{ backgroundColor: '#000317', position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'row', overflowY:'auto' }}>
      <FixedDrawer />

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '87%' }}>
        <Box sx={{ width: '100%', height: '11%', display: 'flex', justifyContent: 'end', margin: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingRight: '15px' }}>
            <Button onClick={() => goTo('coin')} sx={{ margin: 'auto 8px', padding: '10px 6px', backgroundColor: 'rgba(87, 23, 115,0.51)', color: 'white', border:'1px solid #571773', '&:hover': {border:'1px solid #5114A6'}}}>
              <FontAwesomeIcon icon={faBell} className='text-xl' />
            </Button>
            <Button onClick={() => goTo('summary')} sx={{ margin: 'auto 8px', padding: '10px 6px', backgroundColor: 'rgba(87, 23, 115,0.51)', color: 'white', border:'1px solid #571773','&:hover': {border:'1px solid #5114A6'}}}>
              <FontAwesomeIcon icon={faMoneyBillTransfer} className='text-xl'/>
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: '89%', }}>
          <Outlet/>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
