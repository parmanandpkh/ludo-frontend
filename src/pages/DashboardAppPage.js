// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from "../sections/@dashboard/app";
import PaidIcon from "@mui/icons-material/Paid";
import { useEffect, useState } from "react";
import errorHandler from "src/utils/errorHandler";
import AxiosInterceptor from "src/utils/AxiosInterceptor";

export default function DashboardAppPage() {
  const theme = useTheme();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await AxiosInterceptor().get("/access/dashboardPage");
        setData(data?.data)
      } catch (error) {
        errorHandler();
      }
    };

    getData();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Number of Users Registered"
              total={data?.totalUsers}
              icon={"ep:user-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Active User"
              total={data?.totalActiveUsers}
              color="info"
              icon={"ep:user-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Inactive User"
              total={data?.totalInActiveUsers}
              color="warning"
              icon={"ep:user-filled"}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Payment Reports" total="$34" color="error" icon={'ic:outline-payment'} />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Payment Status"
              // subheader="(+43%) than last year"
              chartLabels={['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003']}
              chartData={[
                {
                  // name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  // name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  // name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="User Report"
              chartData={[
                { label: 'Active Users', value: 4344 },
                { label: 'Inactive Users', value: 5435 },
               
                
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
