import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Box, Container , Button } from "@mui/material";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import MUIDataTable from "mui-datatables";

import {getAllCars} from "../services/cars";
const options = {
  textLabels: {
    body: {
      noMatch: "Sorry, no matching records found",
      toolTip: "Sort",
      columnHeaderTooltip: column => `Sort for ${column.label}`
    },
    pagination: {
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "Rows per page:",
      displayRows: "of",
    },
    toolbar: {
      search: "Search",
      downloadCsv: "Download CSV",
      print: "Print",
      viewColumns: "View Columns",
      filterTable: "Filter Table",
    },
    filter: {
      all: "All",
      title: "FILTERS",
      reset: "RESET",
    },
    viewColumns: {
      title: "Show Columns",
      titleAria: "Show/Hide Table Columns",
    },
    selectedRows: {
      text: "row(s) selected",
      delete: "Delete",
      deleteAria: "Delete Selected Rows",
    },
  }
}

const columns = [
  {
    name: "registrationNumber",
    label: "Registration Number",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "color",
    label: "Color",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "model",
    label: "Model",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "make",
    label: "Make",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "category",
    label: "Category",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Edit",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button onClick={() => console.log(tableMeta)}>
            Edit
          </Button>
        );
      }
    }
  },
];

const Cars = () => {
  const[data , setData ] = React.useState([]);
  const router = useRouter();
  React.useEffect(() => {
    const auth =localStorage.getItem('authenticated');
    if(auth !== 'true') {
      router.push('/login');
    }
    getAllCars().then(res => {
      console.log(res);
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    })

  }, []);
  // const options = {
  //   serverSide: true,
  //   onTableChange: (action, tableState) => {
  //     this.xhrRequest('my.api.com/tableData', result => {
  //       this.setState({ data: result });
  //     });
  //   }
  // };
  const handleAdd = (e) => {
    e.preventDefault();
    router.push('/addCar')
  }
  return (
    <>
      <Head>
        <title>Cars | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar onClick = {handleAdd} buttonText={'Add Car'} />
          <Box sx={{ mt: 3 }}>
            {/* <CustomerListResults customers={customers} /> */}

            <MUIDataTable title={"Categories"} data={data} columns={columns} options={options} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Cars.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Cars;
