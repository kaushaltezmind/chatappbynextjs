import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Paper,
  InputBase,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CustomerApi } from "../../app/services/customerApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import { ROUTE_CUSTOMER_LIST } from "../../app/constants/page";
import DashBoardPageLayout from "../../app/layouts/DashBoardPageLayout";
import { useRouter } from "next/router";
import Link from "next/link";

const columns = [
  { field: "userid", headerName: "ID" },
  {
    field: "updated_at",
    headerName: "Date / Time",
    flex: 0.15,
  },
  {
    field: "firstname",
    headerName: "Name",
    flex: 0.2,
    renderCell: (params) => (
      <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar
          alt={`${params.row.firstname} ${params.row.lastname}`}
          src={"/assets/profile.png"}
        />
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          {params.row.firstname} {params.row.lastname}
        </Typography>
      </Box>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.15,
  },
  {
    field: "mobilenumber",
    headerName: "Phone",
    flex: 0.1,
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    flex: 0.05,

    renderCell: (params) => (
      <Box marginLeft={"auto"}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          sx={{ marginLeft: "auto" }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    ),
  },
];

const CustomerList = () => {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    CustomerApi.getAllUsers(
      (res) => {
        if (res.data.errorCode && res.data.errorCode === 1) {
          if (res.data.errorMessage === "You are not authorised") {
            router.push("/");
            return;
          }
          alert(res.data.errorMessage);
        } else {
          setTotalCount(res.data.data.count);
          setRows(res.data.data.records);
        }
      },
      (err) => {
        console.log(err);
      },
      search,
      page * rowsPerPage,
      rowsPerPage
    );
  }, [page, rowsPerPage, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newRowsPerPage) => {
    setRowsPerPage(parseInt(event.target.value, newRowsPerPage));
    setPage(0);
  };

  return (
    <DashBoardPageLayout>
      <Box sx={{ backgroundColor: "white" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 20px 16px 20px",
            borderBottom: "1px solid #DEE4EA",
          }}
        >
          <Typography sx={{ color: "#6B7584", fontSize: "20px" }}>
            Customer List
          </Typography>
          {router.pathname === "/dashboard" && (
            <Link href={ROUTE_CUSTOMER_LIST}>
              <Button
                sx={{
                  height: "30px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  backgroundColor: "#DEECFB",
                  color: "#0064D9",
                  padding: "0 14px",
                  textTransform: "capitalize",
                }}
              >
                View All
              </Button>
            </Link>
          )}
        </Box>
        {router.pathname !== "/dashboard" && (
          <Box sx={{ padding: "20px 24px" }}>
            <Paper
              component="form"
              variant="outlined"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 215,
                height: 42,
                borderRadius: "8px",
              }}
            >
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{
                  flex: 1,
                  fontSize: "14px",
                }}
                value={search}
                placeholder="Search Customer"
                inputProps={{ "aria-label": "Search Customer" }}
                onInput={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Paper>
          </Box>
        )}
        {/* <Box sx={{ width: "100%", display: "flex", height: "fit-content" }}> */}
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.userid}
          border="none"
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          pageSize={rowsPerPage}
          pagination
          page={page}
          onPageChange={handleChangePage}
          sx={{
            "& .MuiDataGrid-footerContainer": {
              display: "none",
            },
            fontSize: "14px",
            color: "#6B7584",
          }}
        />
        {/* </Box> */}
        {router.pathname !== "/dashboard" && (
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            rowsPerPageOptions={[6, 10, 25, 50, 100]}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </DashBoardPageLayout>
  );
};

export default CustomerList;
