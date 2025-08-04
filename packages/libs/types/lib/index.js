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
export const CrawlFrequencySchema = z.enum([
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'custom'
]);
export const CrawlScheduleSchema = z.object({
    enabled: z.boolean(),
    frequency: CrawlFrequencySchema,
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
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=index.js.map