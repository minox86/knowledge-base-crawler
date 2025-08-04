import { z } from 'zod';
export declare const DataSourceTypeSchema: z.ZodEnum<{
    website: "website";
    confluence: "confluence";
    jira: "jira";
    google_drive: "google_drive";
    onedrive: "onedrive";
    s3: "s3";
    azure_blob: "azure_blob";
    teams: "teams";
    slack: "slack";
    discord: "discord";
}>;
export declare const DataSourceStatusSchema: z.ZodEnum<{
    active: "active";
    inactive: "inactive";
    error: "error";
    syncing: "syncing";
}>;
export declare const CrawlFrequencySchema: z.ZodEnum<{
    hourly: "hourly";
    daily: "daily";
    weekly: "weekly";
    monthly: "monthly";
    custom: "custom";
}>;
export declare const CrawlScheduleSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    frequency: z.ZodEnum<{
        hourly: "hourly";
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        custom: "custom";
    }>;
    cronExpression: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const DataSourceConfigSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    schedule: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        frequency: z.ZodEnum<{
            hourly: "hourly";
            daily: "daily";
            weekly: "weekly";
            monthly: "monthly";
            custom: "custom";
        }>;
        cronExpression: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const DataSourceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
        website: "website";
        confluence: "confluence";
        jira: "jira";
        google_drive: "google_drive";
        onedrive: "onedrive";
        s3: "s3";
        azure_blob: "azure_blob";
        teams: "teams";
        slack: "slack";
        discord: "discord";
    }>;
    config: z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        schedule: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            frequency: z.ZodEnum<{
                hourly: "hourly";
                daily: "daily";
                weekly: "weekly";
                monthly: "monthly";
                custom: "custom";
            }>;
            cronExpression: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        error: "error";
        syncing: "syncing";
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export type DataSourceType = z.infer<typeof DataSourceTypeSchema>;
export type DataSourceStatus = z.infer<typeof DataSourceStatusSchema>;
export type CrawlFrequency = z.infer<typeof CrawlFrequencySchema>;
export type CrawlSchedule = z.infer<typeof CrawlScheduleSchema>;
export type DataSourceConfig = z.infer<typeof DataSourceConfigSchema>;
export type DataSource = z.infer<typeof DataSourceSchema>;
//# sourceMappingURL=index.d.ts.map