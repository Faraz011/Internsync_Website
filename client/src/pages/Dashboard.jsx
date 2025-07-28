import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ProjectsTable from '../components/ProjectsTable';
import OrdersOverview from '../components/OrdersOverview';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';


function Dashboard() {
  const statsData = [
    {
      title: "Today's Money",
      value: '$53k',
      icon: 'weekend',
      trend: 'up',
      trendValue: '+55%',
      trendText: 'than last week',
      color: '#344767',
    },
    {
      title: "Today's Users",
      value: '2300',
      icon: 'person',
      trend: 'up',
      trendValue: '+3%',
      trendText: 'than last month',
      color: '#344767',
    },
    {
      title: 'Ads Views',
      value: '3,462',
      icon: 'leaderboard',
      trend: 'down',
      trendValue: '-2%',
      trendText: 'than yesterday',
      color: '#344767',
    },
    {
      title: 'Sales',
      value: '$103,430',
      icon: 'weekend',
      trend: 'up',
      trendValue: '+5%',
      trendText: 'than yesterday',
      color: '#344767',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#344767',
            fontWeight: 700,
            fontSize: '1.5rem',
            mb: 0.5,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#67748e',
            fontSize: '1rem',
          }}
        >
          Check the sales, value and bounce rate by country.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} xl={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={4}>
          <ChartCard
            title="Website Views"
            subtitle="Last Campaign Performance"
            chart={<BarChart />}
            lastUpdate="campaign sent 2 days ago"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartCard
            title="Daily Sales"
            subtitle="(+15%) increase in today sales."
            chart={<LineChart type="sales" />}
            lastUpdate="updated 4 min ago"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartCard
            title="Completed Tasks"
            subtitle="Last Campaign Performance"
            chart={<LineChart type="tasks" />}
            lastUpdate="just updated"
          />
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ProjectsTable />
        </Grid>
        <Grid item xs={12} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
