import { z } from 'zod';

// Data Source Types with Zod
export const DataSourceTypeSchema = z.enum([
  'website',
  'confluence',
  'jira',
  'google_drive',
  'onedrive',
  's3',
  'azure_blob',
  'teams',
  'slack',
  'discord'
]);

export const DataSourceStatusSchema = z.enum([
  'active',
  'inactive',
  'error',
  'syncing'
]);

export const CrawlScheduleSchema = z.object({
  enabled: z.boolean(),
  cronExpression: z.string().optional(),
});

export const DataSourceConfigSchema = z.object({
  url: z.string().url().optional(),
  credentials: z.record(z.string(), z.unknown()).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  schedule: CrawlScheduleSchema.optional(),
});

export const DataSourceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: DataSourceTypeSchema,
  config: DataSourceConfigSchema,
  status: DataSourceStatusSchema,
  lastCrawl: z.string().datetime().optional(),
  documentsCount: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Export the inferred TypeScript types
export type DataSourceType = z.infer<typeof DataSourceTypeSchema>;
export type DataSourceStatus = z.infer<typeof DataSourceStatusSchema>;
export type CrawlSchedule = z.infer<typeof CrawlScheduleSchema>;
export type DataSourceConfig = z.infer<typeof DataSourceConfigSchema>;
export type DataSource = z.infer<typeof DataSourceSchema>;

// Alias for backward compatibility
export type CrawlStatus = DataSourceStatus;