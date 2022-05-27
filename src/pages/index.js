import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { useState,useEffect } from 'react';
import { Budget } from '../components/dashboard/budget';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import {getAllCars} from '../services/cars';
const Dashboard = () => {
  const [numebrofCars, setNumberofCars] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const auth =localStorage.getItem('authenticated');
    if(auth !== 'true') {
      router.push('/login');
    }
    getAllCars().then(data => {
      setNumberofCars(data.data.length);
    } ).catch(error => {
      console.log(error);
    });
  }, []);
  return (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Budget  title = {'Registered Cars'} value = {numebrofCars}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
