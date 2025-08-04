// Example usage of the DataSource schema
import { DataSourceSchema } from './index.js';
// Example of creating a valid DataSource object
const exampleDataSource = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'My Confluence Site',
    type: 'confluence',
    config: {
        url: 'https://mycompany.atlassian.net',
        credentials: {
            token: 'secret-token'
        },
        schedule: {
            enabled: true,
            frequency: 'daily'
        }
    },
    status: 'active',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z')
};
// Validate the object using the Zod schema
const validationResult = DataSourceSchema.safeParse(exampleDataSource);
if (validationResult.success) {
    console.log('✅ DataSource is valid:', validationResult.data);
}
else {
    console.log('❌ Validation failed:', validationResult.error.issues);
}
export { exampleDataSource };
//# sourceMappingURL=example.js.map