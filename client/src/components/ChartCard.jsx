import React from 'react';
import { Card, CardContent, Box, Typography, Icon } from '@mui/material';

function ChartCard({ title, subtitle, chart, lastUpdate, icon }) {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 2px 14px 0 rgba(0,0,0,0.1)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#344767',
            fontSize: '1rem',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#67748e',
            fontSize: '0.875rem',
            mb: 2,
          }}
        >
          {subtitle}
        </Typography>
        
        <Box sx={{ height: 170, mb: 2 }}>
          {chart}
        </Box>
      </CardContent>
      
      <Box
        sx={{
          borderTop: '1px solid #dee2e6',
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon sx={{ fontSize: '16px', color: '#67748e', mr: 0.5 }}>
          schedule
        </Icon>
        <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#67748e' }}>
          {lastUpdate}
        </Typography>
      </Box>
    </Card>
  );
}

export default ChartCard;
