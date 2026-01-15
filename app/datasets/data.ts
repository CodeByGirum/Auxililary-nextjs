
export const MOCK_DATASETS = [
    {
        id: '1',
        name: 'Retail Sales Forecast Demo',
        source: 'Salesforce',
        type: 'CSV',
        updated: 'Last Monday at 12:33 AM',
        status: 'Not deployed',
        data: {
            headers: ['Store ID', 'Employee ID', 'Area', 'Date'],
            rows: [
                { 'Store ID': 1, 'Employee ID': 54, 'Area': 'Asia', 'Date': '2018-01-31' },
                { 'Store ID': 1, 'Employee ID': 57, 'Area': 'Asia', 'Date': '2018-02-28' },
                { 'Store ID': 1, 'Employee ID': 50, 'Area': 'Asia', 'Date': '2018-03-31' },
                { 'Store ID': 1, 'Employee ID': 56, 'Area': 'Asia', 'Date': '2018-04-30' },
            ]
        }
    },
    {
        id: '2',
        name: 'Employee Attrition Demo',
        source: 'Workday',
        type: 'XLSX',
        updated: '06/27/2025',
        status: 'Not deployed',
        visualHint: 'bar',
        data: {
            headers: ['Job Title', 'Years of Exp', 'Department', 'Salary Range'],
            rows: [
                { 'Job Title': 'Assistant', 'Years of Exp': 25, 'Department': 'Sales', 'Salary Range': 'High' },
                { 'Job Title': 'Consultant', 'Years of Exp': 29, 'Department': 'Customer Service', 'Salary Range': 'Medium' },
                { 'Job Title': 'Executive', 'Years of Exp': 6, 'Department': 'Sales', 'Salary Range': 'High' },
                { 'Job Title': 'Consultant', 'Years of Exp': 3, 'Department': 'Marketing', 'Salary Range': 'Medium' },
            ]
        }
    },
    {
        id: '3',
        name: 'inconsistent_dataset',
        source: 'Manual Upload',
        type: 'JSON',
        updated: '12/04/2024',
        status: 'Not deployed',
        data: {
            headers: ['Product_ID', 'Price', 'Advertising', 'Budget'],
            rows: [
                { 'Product_ID': 'P001', 'Price': null, 'Advertising': null, 'Budget': null },
                { 'Product_ID': 'P002', 'Price': 150, 'Advertising': 510.0, 'Budget': 11500.0 },
                { 'Product_ID': 'P003', 'Price': 200, 'Advertising': 520.0, 'Budget': 12000.0 },
                { 'Product_ID': 'P004', 'Price': 250, 'Advertising': 530.0, 'Budget': 12500.0 },
            ]
        }
    },
    {
        id: '4',
        name: 'Sentiment Model',
        source: 'HuggingFace',
        type: 'Parquet',
        updated: '12/02/2024',
        status: 'Deployed',
        visualHint: 'pie',
        data: {
            headers: ['Review Text', 'Review', 'Review_Binary'],
            rows: [
                { 'Review Text': 'Wow... Loved this place.', 'Review': 'Positive', 'Review_Binary': 1 },
                { 'Review Text': 'Crust is not good.', 'Review': 'Negative', 'Review_Binary': 0 },
                { 'Review Text': 'Not tasty and texture bad.', 'Review': 'Negative', 'Review_Binary': 0 },
                { 'Review Text': 'Stopped by during late May...', 'Review': 'Positive', 'Review_Binary': 1 },
            ]
        }
    },
    {
        id: '5',
        name: 'Lead Scoring Demo',
        source: 'HubSpot',
        type: 'CSV',
        updated: '11/27/2024',
        status: 'Not deployed',
        data: {
            headers: ['Job Title', 'Years of Exp', 'Company Size', 'Industry'],
            rows: [
                { 'Job Title': 'Assistant', 'Years of Exp': 23, 'Company Size': 'Large', 'Industry': 'IT' },
                { 'Job Title': 'Manager', 'Years of Exp': 23, 'Company Size': 'Large', 'Industry': 'Finance' },
                { 'Job Title': 'Manager', 'Years of Exp': 24, 'Company Size': 'Large', 'Industry': 'Finance' },
                { 'Job Title': 'Executive', 'Years of Exp': 3, 'Company Size': 'Large', 'Industry': 'Healthcare' },
            ]
        }
    },
    {
        id: '6',
        name: 'Churn Prediction Demo',
        source: 'Salesforce',
        type: 'CSV',
        updated: '11/27/2024',
        status: 'Not deployed',
        data: {
            headers: ['Customer_ID', 'Tenure', 'MonthlyCharges', 'TotalCharges'],
            rows: [
                { 'Customer_ID': 'C1001', 'Tenure': 12, 'MonthlyCharges': 70.5, 'TotalCharges': 846.0 },
                { 'Customer_ID': 'C1002', 'Tenure': 24, 'MonthlyCharges': 85.0, 'TotalCharges': 2040.0 },
                { 'Customer_ID': 'C1003', 'Tenure': 5, 'MonthlyCharges': 50.0, 'TotalCharges': 250.0 },
                { 'Customer_ID': 'C1004', 'Tenure': 36, 'MonthlyCharges': 90.0, 'TotalCharges': 3240.0 },
            ]
        }
    },
    {
        id: '7',
        name: 'Credit Card Fraud Demo',
        source: 'Stripe',
        type: 'JSON',
        updated: '11/27/2024',
        status: 'Not deployed',
        data: {
            headers: ['Transaction_ID', 'Transaction_Type', 'Currency', 'Amount'],
            rows: [
                { 'Transaction_ID': 7271, 'Transaction_Type': 'US', 'Currency': 'AUD', 'Amount': 1 },
                { 'Transaction_ID': 861, 'Transaction_Type': 'US', 'Currency': 'AUD', 'Amount': 8 },
                { 'Transaction_ID': 5391, 'Transaction_Type': 'US', 'Currency': 'CAD', 'Amount': 12 },
                { 'Transaction_ID': 5192, 'Transaction_Type': 'US', 'Currency': 'USD', 'Amount': 5 },
            ]
        }
    }
];
