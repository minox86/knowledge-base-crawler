import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  // Edit as EditIcon, // TODO: Use when edit functionality is implemented
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Vector Database Settings
    vectorDbType: 'chroma',
    vectorDbUrl: 'http://localhost:8000',
    vectorDbCollection: 'knowledge_base',

    // Performance Settings
    maxDocumentSize: 10,
    crawlTimeout: 300,
    retryAttempts: 3,
  });

  const [saveMessage, setSaveMessage] = useState('');

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Implement actual save functionality
    console.log('Saving settings:', settings);
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your Knowledge Base Crawler system
        </Typography>
      </Box>

      {/* Save Message */}
      {saveMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {saveMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Vector Database Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Vector Database" />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={3}>
                <FormControl fullWidth>
                  <InputLabel>Database Type</InputLabel>
                  <Select
                    value={settings.vectorDbType}
                    onChange={(e) =>
                      handleSettingChange('vectorDbType', e.target.value)
                    }
                  >
                    <MenuItem value="chroma">ChromaDB</MenuItem>
                    <MenuItem value="qdrant">Qdrant</MenuItem>
                    <MenuItem value="pinecone">Pinecone</MenuItem>
                    <MenuItem value="mongodb">
                      MongoDB Atlas Vector Search
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Database URL"
                  value={settings.vectorDbUrl}
                  onChange={(e) =>
                    handleSettingChange('vectorDbUrl', e.target.value)
                  }
                  fullWidth
                />

                <TextField
                  label="Collection Name"
                  value={settings.vectorDbCollection}
                  onChange={(e) =>
                    handleSettingChange('vectorDbCollection', e.target.value)
                  }
                  fullWidth
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Performance" />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  label="Max Document Size (MB)"
                  type="number"
                  value={settings.maxDocumentSize}
                  onChange={(e) =>
                    handleSettingChange(
                      'maxDocumentSize',
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                  inputProps={{ min: 1, max: 100 }}
                />

                <TextField
                  label="Crawl Timeout (seconds)"
                  type="number"
                  value={settings.crawlTimeout}
                  onChange={(e) =>
                    handleSettingChange(
                      'crawlTimeout',
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                  inputProps={{ min: 30, max: 3600 }}
                />

                <TextField
                  label="Retry Attempts"
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) =>
                    handleSettingChange(
                      'retryAttempts',
                      parseInt(e.target.value)
                    )
                  }
                  fullWidth
                  inputProps={{ min: 0, max: 10 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
