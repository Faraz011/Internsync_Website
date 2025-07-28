import React from 'react';
import { Card, CardContent, Box, Typography, Icon } from '@mui/material';

function StatCard({ title, value, icon, trend, trendValue, trendText, color = '#344767' }) {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 2px 14px 0 rgba(0,0,0,0.1)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#67748e',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: '#344767',
                fontWeight: 700,
                fontSize: '1.5rem',
                mb: 0,
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '12px',
              background: `linear-gradient(195deg, ${color} 0%, ${color}CC 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 4px 20px 0 ${color}40`,
            }}
          >
            <Icon sx={{ fontSize: '24px' }}>{icon}</Icon>
          </Box>
        </Box>
      </CardContent>
      
      <Box
        sx={{
          borderTop: '1px solid #dee2e6',
          px: 2,
          py: 1.5,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#67748e' }}>
          <Box
            component="span"
            sx={{
              color: trend === 'up' ? '#4caf50' : '#f44336',
              fontWeight: 700,
            }}
          >
            {trendValue}{' '}
          </Box>
          {trendText}
        </Typography>
      </Box>
    </Card>
  );
}

export default StatCard;
