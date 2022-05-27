import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {useState , useEffect ,useContext} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography , Alert } from '@mui/material';
import { login } from 'src/services/commons';
const Login = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: 'silverfulbuster1496@gmail.com',
      password: 'b3y7q91g'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: async () => {
      try{
        const { email, password } = formik.values;
        const  data  = await login( email, password );
        console.log(data)      
        alert.open = true;
        alert.message = 'Logging in...';
        alert.severity = 'info';
        router.push('/');
      }catch(error){
        console.log(error)
        alert.open = true;
        alert.message = 'Error Logging in...';
        alert.severity = 'error';
      }

    }
  });
  useEffect(() => {
    if(router.query.registered === 'true') {
      console.log('registered')
      setAlert({
        open: true,
        message: 'Signed Up Successfully check Email for Password',
        severity: 'success',
      });
    }
  },[])
  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
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
        {alert.open ? <Alert severity={alert.severity}>{alert.message}</Alert> : <></> }
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
