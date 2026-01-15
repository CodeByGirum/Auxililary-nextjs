export interface Integration {
    id: string;
    name: string;
    logo: string;
    status: 'Connected' | 'Not Connected';
    badge?: string;
    description: string;
    category?: 'Marketing' | 'Social' | 'Database' | 'Communication';
}
