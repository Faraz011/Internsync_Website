import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Icon,
} from '@mui/lab';
import { TrendingUp } from '@mui/icons-material';

const ordersData = [
  {
    id: 1,
    icon: 'notifications',
    color: '#4caf50',
    title: '$2400, Design changes',
    time: '22 DEC 7:20 PM',
  },
  {
    id: 2,
    icon: 'code',
    color: '#f44336',
    title: 'New order #1832412',
    time: '21 DEC 11 PM',
  },
  {
    id: 3,
    icon: 'shopping_cart',
    color: '#17c1e8',
    title: 'Server payments for April',
    time: '21 DEC 9:34 PM',
  },
  {
    id: 4,
    icon: 'credit_card',
    color: '#fb8c00',
    title: 'New card added for order #4395133',
    time: '20 DEC 2:20 AM',
  },
  {
    id: 5,
    icon: 'key',
    color: '#e91e63',
    title: 'Unlock packages for development',
    time: '18 DEC 4:54 AM',
  },
  {
    id: 6,
    icon: 'payments',
    color: '#344767',
    title: 'New order #9583120',
    time: '17 DEC',
  },
];

function OrdersOverview() {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 2px 14px 0 rgba(0,0,0,0.1)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ color: '#344767', fontSize: '1rem', fontWeight: 600, mb: 0.5 }}
        >
          Orders overview
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <TrendingUp sx={{ color: '#4caf50', fontSize: '16px', mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#67748e' }}>
            <Box component="span" sx={{ fontWeight: 700 }}>24%</Box> this month
          </Typography>
        </Box>

        <Timeline sx={{ p: 0 }}>
          {ordersData.map((order, index) => (
            <TimelineItem key={order.id} sx={{ minHeight: '48px' }}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: order.color,
                    border: 'none',
                    boxShadow: 'none',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon sx={{ color: 'white', fontSize: '16px' }}>
                    {order.icon}
                  </Icon>
                </TimelineDot>
                {index < ordersData.length - 1 && (
                  <TimelineConnector sx={{ backgroundColor: '#dee2e6' }} />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ py: 0, px: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#344767',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    mb: 0.25,
                  }}
                >
                  {order.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#67748e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {order.time}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

export default OrdersOverview;
