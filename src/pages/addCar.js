import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { getAllCategories } from "../services/categories";
import {
  Box,
  Button,
  Field,
  Container,
  FormHelperText,
  Link,
  TextField,
  Select,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { createCar } from "../services/cars";
const CategoriesSelect = (props) => {
  const { categories } = props;
  return (
    <TextField select {...props}>
      {categories?.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.category}
        </MenuItem>
      ))}
    </TextField>
  );
};

const AddCar = () => {
  React.useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    if (auth !== "true") {
      router.push("/login");
    }
  }, []);
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      registrationNumber: Yup.string().max(255).required("registrationNumber is required"),
      category: Yup.string().max(255).required("category is required"),
      model: Yup.string().max(255).required("model is required"),
      color: Yup.string().max(255).required("color is required"),
      make: Yup.string().max(255).required("make is required"),
    }),
    onSubmit: async () => {
      try {
        debugger
        const { registrationNumber, category, model , color , make  } = formik.values;

        console.log(registrationNumber, category, model , color , make);
        return
        const data = await createCar(category);
        console.log(data);
        alert.open = true;
        alert.message = "Adding Car...";
        alert.severity = "info";
        router.push({
          pathname: "/cars",
        });
      } catch (error) {
        console.log(error);
        alert.open = true;
        alert.message = "Error Adding Category...";
        alert.severity = "error";
      }
    },
  });
  React.useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Add Car | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              {alert.open ? <Alert severity={alert.severity}>{alert.message}</Alert> : <></>}
              <Typography color="textPrimary" variant="h4">
                Create a new Car
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.registrationNumber && formik.errors.registrationNumber)}
              fullWidth
              helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
              label="Registration Number"
              margin="normal"
              name="registrationNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.registrationNumber}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.color && formik.errors.color)}
              fullWidth
              helperText={formik.touched.color && formik.errors.color}
              label="Color"
              margin="normal"
              name="color"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.color}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.model && formik.errors.model)}
              fullWidth
              helperText={formik.touched.model && formik.errors.model}
              label="Model"
              margin="normal"
              name="model"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.model}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.make && formik.errors.make)}
              fullWidth
              helperText={formik.touched.make && formik.errors.make}
              label="Make"
              margin="normal"
              name="Make"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.make}
              variant="outlined"
            />
            <TextField
              select
              error={Boolean(formik.touched.category && formik.errors.category)}
              fullWidth
              helperText={formik.touched.category && formik.errors.category}
              label="Category"
              margin="normal"
              name="Category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.category}
              variant="outlined"
            >
              {categories?.map((state) => (
                <MenuItem
                  key={state.id}
                  value={state.id}
                  onClick={(e) => {
                    const { value } = e.currentTarget.dataset;
                    formik.setFieldValue("category",value);
                  }
                  }
                 
                >
                  {state.category}
                </MenuItem>
              ))}
            </TextField>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            ></Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
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
AddCar.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddCar;
