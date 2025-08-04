import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { DataSource, DataSourceType } from '@knowledge-crawler/types';
import { DataSourceCard } from '@/components/DataSourceCard/DataSourceCard';
// import { useAppStore } from '@/store/appStore'; // TODO: Use when connecting to real data

// Mock data for demonstration
const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Confluence Wiki',
    type: 'confluence',
    config: {
      url: 'https://company.atlassian.net',
      schedule: { enabled: true, cronExpression: '0 */6 * * *' },
    },
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Jira Issues',
    type: 'jira',
    config: {
      url: 'https://company.atlassian.net',
      schedule: { enabled: true, cronExpression: '0 */12 * * *' },
    },
    status: 'error',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Google Drive Documents',
    type: 'google_drive',
    config: {
      schedule: { enabled: false },
    },
    status: 'inactive',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '4',
    name: 'Company Website',
    type: 'website',
    config: {
      url: 'https://company.com/docs',
      schedule: { enabled: true, cronExpression: '0 0 * * *' },
    },
    status: 'syncing',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
  },
];

interface AddDataSourceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (dataSource: Partial<DataSource>) => void;
}

const AddDataSourceDialog: React.FC<AddDataSourceDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<DataSourceType>('website');
  const [url, setUrl] = useState('');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [cronExpression, setCronExpression] = useState('0 */6 * * *');

  const handleSave = () => {
    const newDataSource: Partial<DataSource> = {
      name,
      type,
      config: {
        url: url || undefined,
        schedule: {
          enabled: scheduleEnabled,
          cronExpression: scheduleEnabled ? cronExpression : undefined,
        },
      },
    };
    onSave(newDataSource);
    onClose();
    // Reset form
    setName('');
    setType('website');
    setUrl('');
    setScheduleEnabled(false);
    setCronExpression('0 */6 * * *');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Data Source</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as DataSourceType)}
            >
              <MenuItem value="website">Website</MenuItem>
              <MenuItem value="confluence">Confluence</MenuItem>
              <MenuItem value="jira">Jira</MenuItem>
              <MenuItem value="google_drive">Google Drive</MenuItem>
              <MenuItem value="onedrive">OneDrive</MenuItem>
              <MenuItem value="s3">Amazon S3</MenuItem>
              <MenuItem value="azure_blob">Azure Blob Storage</MenuItem>
              <MenuItem value="teams">Microsoft Teams</MenuItem>
              <MenuItem value="slack">Slack</MenuItem>
              <MenuItem value="discord">Discord</MenuItem>
            </Select>
          </FormControl>

          {(type === 'website' || type === 'confluence' || type === 'jira') && (
            <TextField
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
              placeholder="https://example.com"
            />
          )}

          <FormControlLabel
            control={
              <Switch
                checked={scheduleEnabled}
                onChange={(e) => setScheduleEnabled(e.target.checked)}
              />
            }
            label="Enable automatic syncing"
          />

          {scheduleEnabled && (
            <TextField
              label="Cron Expression"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              fullWidth
              helperText="e.g., '0 */6 * * *' for every 6 hours"
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!name}>
          Add Data Source
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DataSources: React.FC = () => {
  // const { dataSources, setDataSources } = useAppStore(); // TODO: Use when connecting to real data
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [sources, setSources] = useState<DataSource[]>(mockDataSources);

  // Filter data sources based on search query
  const filteredSources = sources.filter(
    (source) =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDataSource = (newDataSource: Partial<DataSource>) => {
    const dataSource: DataSource = {
      id: Date.now().toString(),
      name: newDataSource.name!,
      type: newDataSource.type!,
      config: newDataSource.config!,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSources([...sources, dataSource]);
  };

  const handleEditDataSource = (dataSource: DataSource) => {
    console.log('Edit data source:', dataSource);
    // TODO: Implement edit functionality
  };

  const handleDeleteDataSource = (dataSource: DataSource) => {
    setSources(sources.filter((s) => s.id !== dataSource.id));
  };

  const handleStartDataSource = (dataSource: DataSource) => {
    setSources(
      sources.map((s) =>
        s.id === dataSource.id
          ? { ...s, status: 'active' as const, updatedAt: new Date() }
          : s
      )
    );
  };

  const handleStopDataSource = (dataSource: DataSource) => {
    setSources(
      sources.map((s) =>
        s.id === dataSource.id
          ? { ...s, status: 'inactive' as const, updatedAt: new Date() }
          : s
      )
    );
  };

  const handleRefreshDataSource = (dataSource: DataSource) => {
    setSources(
      sources.map((s) =>
        s.id === dataSource.id
          ? { ...s, status: 'syncing' as const, updatedAt: new Date() }
          : s
      )
    );

    // Simulate sync completion
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) =>
          s.id === dataSource.id
            ? { ...s, status: 'active' as const, updatedAt: new Date() }
            : s
        )
      );
    }, 3000);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Sources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your knowledge base data sources
        </Typography>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search data sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              startIcon={<RefreshIcon />}
              variant="outlined"
              onClick={() => {
                // TODO: Implement refresh all
                console.log('Refresh all data sources');
              }}
            >
              Refresh All
            </Button>

            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => setAddDialogOpen(true)}
            >
              Add Data Source
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Status Alert */}
      {sources.some((s) => s.status === 'error') && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Some data sources have errors. Please check their configuration and
          try again.
        </Alert>
      )}

      {/* Data Sources Grid */}
      {filteredSources.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No data sources found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              {searchQuery
                ? 'Try adjusting your search criteria.'
                : 'Get started by adding your first data source.'}
            </Typography>
            {!searchQuery && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAddDialogOpen(true)}
              >
                Add Data Source
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredSources.map((source) => (
            <Grid item xs={12} sm={6} md={4} key={source.id}>
              <DataSourceCard
                dataSource={source}
                onEdit={handleEditDataSource}
                onDelete={handleDeleteDataSource}
                onStart={handleStartDataSource}
                onStop={handleStopDataSource}
                onRefresh={handleRefreshDataSource}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add data source"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setAddDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Data Source Dialog */}
      <AddDataSourceDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddDataSource}
      />
    </Box>
  );
};
