import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DashboardLayout } from "../components/dashboard-layout";
import { createCategory } from "../services/categories"
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Alert
} from '@mui/material';
const AddCategory = () => {
 useEffect(() => {
    const auth =localStorage.getItem('authenticated');
    if(auth !== 'true') {
      router.push('/login');
    }
  }, []);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      category: '',
    },
    validationSchema: Yup.object({
      category: Yup
        .string()
        .max(255)
        .required(
          'category is required')
    }),
    onSubmit: async () => {
      try{
        const { category } = formik.values;
        console.log(category)
        const  data  = await createCategory( category );
        console.log(data)      
        alert.open = true;
        alert.message = 'Adding Category...';
        alert.severity = 'info';
        router.push({
          pathname: '/categories',
      });
      }catch(error){
        console.log(error)
        alert.open = true;
        alert.message = 'Error Adding Category...';
        alert.severity = 'error';
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Add Category | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
            {alert.open ? <Alert severity={alert.severity}>{alert.message}</Alert> : <></> }
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new category
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.category && formik.errors.category)}
              fullWidth
              helperText={formik.touched.category && formik.errors.category}
              label="Category"
              margin="normal"
              name="category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.category}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};
AddCategory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddCategory;
