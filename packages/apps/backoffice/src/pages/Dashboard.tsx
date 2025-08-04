import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  CloudSync as SyncIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
// import { useAppStore } from '@/store/appStore'; // TODO: Use when connecting to real data

// Mock data for demonstration
const mockStats = {
  totalDataSources: 12,
  activeDataSources: 8,
  syncingDataSources: 2,
  errorDataSources: 2,
  totalDocuments: 1247,
  lastSyncTime: new Date('2024-01-15T10:30:00'),
};

const mockRecentActivity = [
  {
    id: '1',
    type: 'sync_completed',
    source: 'Confluence Wiki',
    timestamp: new Date('2024-01-15T09:45:00'),
    status: 'success',
  },
  {
    id: '2',
    type: 'sync_failed',
    source: 'Jira Issues',
    timestamp: new Date('2024-01-15T09:30:00'),
    status: 'error',
  },
  {
    id: '3',
    type: 'new_source_added',
    source: 'Google Drive',
    timestamp: new Date('2024-01-15T09:15:00'),
    status: 'info',
  },
];

export const Dashboard: React.FC = () => {
  // const { dataSources } = useAppStore(); // TODO: Use when connecting to real data

  const getActivityIcon = (type: string, status: string) => {
    if (status === 'error') return <ErrorIcon color="error" />;
    if (status === 'success') return <CheckIcon color="success" />;
    if (type === 'new_source_added') return <StorageIcon color="primary" />;
    return <SyncIcon color="info" />;
  };

  const getActivityText = (type: string, source: string) => {
    switch (type) {
      case 'sync_completed':
        return `Successfully synced ${source}`;
      case 'sync_failed':
        return `Failed to sync ${source}`;
      case 'new_source_added':
        return `Added new data source: ${source}`;
      default:
        return `Activity on ${source}`;
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your Knowledge Base Crawler system
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" color="primary">
                    {mockStats.totalDataSources}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Data Sources
                  </Typography>
                </Box>
                <StorageIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" color="success.main">
                    {mockStats.activeDataSources}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Sources
                  </Typography>
                </Box>
                <CheckIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {mockStats.syncingDataSources}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Syncing
                  </Typography>
                </Box>
                <SyncIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h4" color="error.main">
                    {mockStats.errorDataSources}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Errors
                  </Typography>
                </Box>
                <WarningIcon color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">
                    Data Sources Sync Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(
                      (mockStats.activeDataSources /
                        mockStats.totalDataSources) *
                        100
                    )}
                    %
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={
                    (mockStats.activeDataSources / mockStats.totalDataSources) *
                    100
                  }
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Typography variant="body2" gutterBottom>
                  Total Documents Indexed:{' '}
                  <strong>{mockStats.totalDocuments.toLocaleString()}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Sync: {mockStats.lastSyncTime.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>

              <List disablePadding>
                {mockRecentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        {getActivityIcon(activity.type, activity.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={getActivityText(
                          activity.type,
                          activity.source
                        )}
                        secondary={activity.timestamp.toLocaleString()}
                      />
                    </ListItem>
                    {index < mockRecentActivity.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
