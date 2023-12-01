import { Box, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import DashBoardPageLayout from "../../app/layouts/DashBoardPageLayout";
import { Button, IconButton, Avatar, Paper, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { CustomerApi } from "../../app/services/customerApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ROUTE_CUSTOMER_LIST } from "../../app/constants/page";
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

const headerData = [
  {
    icon: (
      <PeopleAltOutlinedIcon
        sx={{
          width: "45px",
          height: "40px",
        }}
      />
    ),
    title: "Customers",
    count: 6035,
  },
  {
    icon: (
      <DescriptionOutlinedIcon
        sx={{
          width: "45px",
          height: "40px",
        }}
      />
    ),
    title: "Invoice",
    count: 19,
  },
  {
    icon: (
      <BugReportOutlinedIcon
        sx={{
          width: "45px",
          height: "40px",
        }}
      />
    ),
    title: "Issues",
    count: 10,
  },
];

const tabData = ["All time", "This year", "This week", "Today"];

const skeletonData = [
  60, 150, 180, 180, 150, 60, 75, 130, 200, 150, 135, 105, 130, 180, 200, 150,
  135, 105,
];

const graphYData = [600, 500, 400, 300, 200, 100];

const Dashboard = () => {
  const [activeSale, setActiveSale] = useState("All time");
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

  return (
    <DashBoardPageLayout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box
          sx={{
            display: "flex",
            width: "1120px",
            justifyContent: "center",
            height: "98px",
            gap: "21px",
          }}
        >
          {headerData?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  backgroundColor: "#0064D9",
                  width: "360px",
                  borderRadius: "16px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "5px",
                  }}
                >
                  {item.icon}
                  <Box sx={{ fontSize: "16px", fontWeight: "600" }}>
                    {item.title}
                  </Box>
                </Box>
                <Box sx={{ fontSize: "24px", fontWeight: "600" }}>
                  {item.count}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            borderRadius: "16px",
            backgroundColor: "white",
            height: "368px",
            padding: "20px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <Typography sx={{ color: "#6B7584", fontSize: "20px" }}>
            Lead sales
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              gap: "2px",
              cursor: "pointer",
            }}
          >
            {tabData?.map((item, i) => {
              return (
                <Box
                  key={i}
                  onClick={() => {
                    setActiveSale(item);
                  }}
                  sx={
                    activeSale === item
                      ? {
                          color: "#0064D9",
                          height: "30px",
                          backgroundColor: "#DEECFB",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          padding: "0 14px",
                          fontSize: "16px",
                        }
                      : {
                          color: "#B3B8BD",
                          height: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          padding: "0 14px",
                          fontSize: "16px",
                        }
                  }
                >
                  {item}
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "left",
              gap: "80px",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
              {graphYData?.map((num, i) => {
                return (
                  <Typography
                    key={i}
                    sx={{ color: "#B3B8BD", fontSize: "12px" }}
                  >
                    $ {num}
                  </Typography>
                );
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Set the direction to column
                gap: "44px",
                height: "216px",
                alignItems: "flex-end",
              }}
            >
              {skeletonData?.map((height, i) => {
                return (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    width={8}
                    height={height}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
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
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
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
        </Box>
      </Box>
    </DashBoardPageLayout>
  );
};

export default Dashboard;
