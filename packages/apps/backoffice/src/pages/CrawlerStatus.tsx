import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface CrawlJob {
  id: string;
  dataSourceName: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  startTime: Date;
  endTime?: Date;
  documentsProcessed: number;
  errors: string[];
}

const mockCrawlJobs: CrawlJob[] = [
  {
    id: '1',
    dataSourceName: 'Confluence Wiki',
    status: 'running',
    progress: 65,
    startTime: new Date('2024-01-15T10:00:00'),
    documentsProcessed: 127,
    errors: [],
  },
  {
    id: '2',
    dataSourceName: 'Company Website',
    status: 'running',
    progress: 32,
    startTime: new Date('2024-01-15T10:15:00'),
    documentsProcessed: 45,
    errors: [],
  },
  {
    id: '3',
    dataSourceName: 'Jira Issues',
    status: 'failed',
    progress: 15,
    startTime: new Date('2024-01-15T09:30:00'),
    endTime: new Date('2024-01-15T09:45:00'),
    documentsProcessed: 12,
    errors: ['Authentication failed', 'Connection timeout'],
  },
  {
    id: '4',
    dataSourceName: 'Google Drive',
    status: 'completed',
    progress: 100,
    startTime: new Date('2024-01-15T08:00:00'),
    endTime: new Date('2024-01-15T08:30:00'),
    documentsProcessed: 89,
    errors: [],
  },
  {
    id: '5',
    dataSourceName: 'Slack Messages',
    status: 'queued',
    progress: 0,
    startTime: new Date('2024-01-15T11:00:00'),
    documentsProcessed: 0,
    errors: [],
  },
];

export const CrawlerStatus: React.FC = () => {
  const [jobs] = useState<CrawlJob[]>(mockCrawlJobs);
  const [selectedJob, setSelectedJob] = useState<CrawlJob | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const getStatusColor = (status: CrawlJob['status']) => {
    switch (status) {
      case 'running':
        return 'warning';
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'queued':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: CrawlJob['status']) => {
    switch (status) {
      case 'running':
        return <RefreshIcon color="warning" />;
      case 'completed':
        return <CheckIcon color="success" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      case 'queued':
        return <ScheduleIcon color="disabled" />;
      default:
        return null;
    }
  };

  const formatDuration = (start: Date, end?: Date) => {
    const endTime = end || new Date();
    const duration = Math.abs(endTime.getTime() - start.getTime());
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const handleViewDetails = (job: CrawlJob) => {
    setSelectedJob(job);
    setDetailsDialogOpen(true);
  };

  const runningJobs = jobs.filter((job) => job.status === 'running');
  const completedJobs = jobs.filter((job) => job.status === 'completed');
  const failedJobs = jobs.filter((job) => job.status === 'failed');
  const queuedJobs = jobs.filter((job) => job.status === 'queued');

  return (
    <Box>
      {/* Page Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crawler Status
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your data crawling operations
        </Typography>
      </Box>

      {/* Summary Cards */}
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
                  <Typography variant="h4" color="warning.main">
                    {runningJobs.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Running
                  </Typography>
                </Box>
                <RefreshIcon color="warning" sx={{ fontSize: 40 }} />
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
                  <Typography variant="h4" color="default">
                    {queuedJobs.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Queued
                  </Typography>
                </Box>
                <ScheduleIcon color="disabled" sx={{ fontSize: 40 }} />
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
                    {completedJobs.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
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
                  <Typography variant="h4" color="error.main">
                    {failedJobs.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Failed
                  </Typography>
                </Box>
                <ErrorIcon color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Jobs Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Crawl Jobs
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data Source</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Documents</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getStatusIcon(job.status)}
                        <Typography variant="body2">
                          {job.dataSourceName}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={job.status.toUpperCase()}
                        color={getStatusColor(job.status) as any}
                        size="small"
                        variant={
                          job.status === 'running' ? 'filled' : 'outlined'
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Box minWidth={120}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinearProgress
                            variant="determinate"
                            value={job.progress}
                            sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                            color={
                              job.status === 'failed' ? 'error' : 'primary'
                            }
                          />
                          <Typography variant="caption" color="text.secondary">
                            {job.progress}%
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {job.documentsProcessed}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {formatDuration(job.startTime, job.endTime)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap={0.5}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(job)}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>

                        {job.status === 'running' ? (
                          <Tooltip title="Stop">
                            <IconButton size="small" color="error">
                              <StopIcon />
                            </IconButton>
                          </Tooltip>
                        ) : job.status === 'failed' ? (
                          <Tooltip title="Retry">
                            <IconButton size="small" color="primary">
                              <PlayIcon />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Job Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Job Details: {selectedJob?.dataSourceName}</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Information
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Status:</strong> {selectedJob.status.toUpperCase()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Progress:</strong> {selectedJob.progress}%
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Documents Processed:</strong>{' '}
                {selectedJob.documentsProcessed}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Start Time:</strong>{' '}
                {selectedJob.startTime.toLocaleString()}
              </Typography>
              {selectedJob.endTime && (
                <Typography variant="body2" gutterBottom>
                  <strong>End Time:</strong>{' '}
                  {selectedJob.endTime.toLocaleString()}
                </Typography>
              )}
              <Typography variant="body2" gutterBottom>
                <strong>Duration:</strong>{' '}
                {formatDuration(selectedJob.startTime, selectedJob.endTime)}
              </Typography>

              {selectedJob.errors.length > 0 && (
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom color="error">
                    Errors ({selectedJob.errors.length})
                  </Typography>
                  <List dense>
                    {selectedJob.errors.map((error, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={error} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <Box p={2}>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </Box>
      </Dialog>
    </Box>
  );
};
