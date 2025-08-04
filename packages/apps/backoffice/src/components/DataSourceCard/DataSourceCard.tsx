import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { DataSource, DataSourceStatus } from '@knowledge-crawler/types';

interface DataSourceCardProps {
  dataSource: DataSource;
  onEdit?: (dataSource: DataSource) => void;
  onDelete?: (dataSource: DataSource) => void;
  onStart?: (dataSource: DataSource) => void;
  onStop?: (dataSource: DataSource) => void;
  onRefresh?: (dataSource: DataSource) => void;
}

const getStatusColor = (status: DataSourceStatus) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'default';
    case 'error':
      return 'error';
    case 'syncing':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: DataSourceStatus) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'error':
      return 'Error';
    case 'syncing':
      return 'Syncing';
    default:
      return 'Unknown';
  }
};

export const DataSourceCard: React.FC<DataSourceCardProps> = ({
  dataSource,
  onEdit,
  onDelete,
  onStart,
  onStop,
  onRefresh,
}) => {
  const statusColor = getStatusColor(dataSource.status) as any;
  const statusLabel = getStatusLabel(dataSource.status);
  const isActive = dataSource.status === 'active';
  const isSyncing = dataSource.status === 'syncing';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography variant="h6" component="h2" noWrap>
            {dataSource.name}
          </Typography>
          <Chip
            label={statusLabel}
            color={statusColor}
            size="small"
            variant={isActive ? 'filled' : 'outlined'}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Type: {dataSource.type.replace('_', ' ').toUpperCase()}
        </Typography>

        {dataSource.config.url && (
          <Typography variant="body2" color="text.secondary" noWrap>
            URL: {dataSource.config.url}
          </Typography>
        )}

        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(dataSource.createdAt).toLocaleDateString()}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            Updated: {new Date(dataSource.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => onEdit?.(dataSource)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Refresh">
            <IconButton
              size="small"
              onClick={() => onRefresh?.(dataSource)}
              disabled={isSyncing}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => onDelete?.(dataSource)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          {isActive || isSyncing ? (
            <Button
              size="small"
              startIcon={<StopIcon />}
              onClick={() => onStop?.(dataSource)}
              disabled={isSyncing}
              color="error"
              variant="outlined"
            >
              Stop
            </Button>
          ) : (
            <Button
              size="small"
              startIcon={<PlayIcon />}
              onClick={() => onStart?.(dataSource)}
              color="success"
              variant="contained"
            >
              Start
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
