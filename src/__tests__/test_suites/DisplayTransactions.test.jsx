//Dependencies 
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import TransactionsList from '../../components/TransactionsList';
import Transaction from '../../components/Transaction';

//Mock Data
const mockTransactions = [
  {
    id: "1",
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000
  },
  {
    id: "2",
    date: "2019-12-02",
    description: "South by Southwest Quinoa Bowl at Fresh & Co",
    category: "Food",
    amount: -10.55
  },
  {
    id: "3",
    date: "2019-12-03",
    description: "Coffee at Starbucks",
    category: "Food",
    amount: -5.25
  },
  {
    id: "4",
    date: "2019-12-05",
    description: "Sunglasses, Urban Outfitters",
    category: "Fashion",
    amount: -24.99
  },
  {
    id: "5",
    date: "2019-12-06",
    description: "Venmo, Alice Pays you for Burrito",
    category: "Food",
    amount: 8.75
  }
];

//Test TransactionList.jsx

    // Base Tests

        // Test: Renders table with correct headers (Date, Description, Category, Amount, DELETE)
        test('renders table with correct headers', () => {
            // Create mock function
            const mockDeleteTransaction = vi.fn();
            
            // Render component
            render(<TransactionsList transactions={mockTransactions} deleteTransaction={mockDeleteTransaction} />);
            
            // Check each header exists
            expect(screen.getByText('Date')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
            expect(screen.getByText('Category')).toBeInTheDocument();
            expect(screen.getByText('Amount')).toBeInTheDocument();
            expect(screen.getByText('DELETE')).toBeInTheDocument();
        });


        // Test: Renders correct number of Transaction components based on transactions array
        test('renders correct number of Transaction components based on transactions array', () => {
            // Create mock function
            const mockDeleteTransaction = vi.fn();
            
            // Render component
            render(<TransactionsList transactions={mockTransactions} deleteTransaction={mockDeleteTransaction} />);
            
            // All transactions appear
            expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
            expect(screen.getByText("South by Southwest Quinoa Bowl at Fresh & Co")).toBeInTheDocument();
            expect(screen.getByText("Coffee at Starbucks")).toBeInTheDocument();
            expect(screen.getByText("Sunglasses, Urban Outfitters")).toBeInTheDocument();
            expect(screen.getByText("Venmo, Alice Pays you for Burrito")).toBeInTheDocument();
        });


        // Test: Passes correct props to each Transaction component
        test('passes correct props to each Transaction component', () => {
            // Create mock function
            const mockDeleteTransaction = vi.fn();
            
            // Render component
            render(<TransactionsList transactions={mockTransactions} deleteTransaction={mockDeleteTransaction} />);
            
            // Check that Transaction components receive and display correct data
            expect(screen.getByText("2019-12-01")).toBeInTheDocument(); 
            expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument(); 
            expect(screen.getByText("Income")).toBeInTheDocument(); 
            expect(screen.getByText("1000")).toBeInTheDocument();
            expect(screen.getByText("Fashion")).toBeInTheDocument();
            expect(screen.getByText("-24.99")).toBeInTheDocument();
            
            // Verify delete buttons exist
            const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
            expect(deleteButtons).toHaveLength(5);
        });

        // Test: Delete button renders and calls deleteTransaction with correct ID on click


        // Test: Table structure is semantically correct (<table>, <tbody>, <tr>, <th>)


    // Edge Cases
        // Test: Empty transactions array renders table with headers only
        test('empty transactions array renders table with headers only', () => {
            // Create mock function and empty array
            const mockDeleteTransaction = vi.fn();
            const emptyTransactions = [];
            
            // Render component with empty array
            render(<TransactionsList transactions={emptyTransactions} deleteTransaction={mockDeleteTransaction} />);
            
            // Headers should still render
            expect(screen.getByText('Date')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
            expect(screen.getByText('Category')).toBeInTheDocument();
            expect(screen.getByText('Amount')).toBeInTheDocument();
            expect(screen.getByText('DELETE')).toBeInTheDocument();
        });


        // Test: Transaction with long description
        test('transaction with long description renders correctly', () => {
            // Create mock function
            const mockDeleteTransaction = vi.fn();
            
            // Create transaction with very long description
            const longDescriptionTransaction = [
                {
                id: "1",
                date: "2019-12-01",
                description: "This is an extremely long transaction description that goes on and on and might cause layout issues if not handled properly in the component rendering process",
                category: "Food",
                amount: -15.99
                }
            ];
            
            // Render component with long description
            render(<TransactionsList transactions={longDescriptionTransaction} deleteTransaction={mockDeleteTransaction} />);

            // data renders correctly
            expect(screen.getByText(/extremely long transaction description/i)).toBeInTheDocument();
            expect(screen.getByText('2019-12-01')).toBeInTheDocument();
            expect(screen.getByText('Food')).toBeInTheDocument();
            expect(screen.getByText('-15.99')).toBeInTheDocument();
            
            // Table structure is maintained
            const rows = screen.getAllByRole('row');
            expect(rows).toHaveLength(2);
        });


        // Test: Special characters in description/category


        // Test: Delete button is click multiple times in a row


    // Fail Cases
        // Test: transactions prop is null
        test('transactions prop is null', () => {
            //Mock function
            const mockDeleteTransaction = vi.fn();
            
            // Transaction are null
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            expect(() => {
                render(<TransactionsList transactions={null} deleteTransaction={mockDeleteTransaction} />);
            }).toThrow();
            
            // Restore console.error
            consoleError.mockRestore();
        });


        // Test: transactions prop is undefined  
        test('transactions prop is undefined', () => {
            // Mock function
            const mockDeleteTransaction = vi.fn();

            // Transactions are undefined
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            expect(() => {
                render(<TransactionsList transactions={undefined} deleteTransaction={mockDeleteTransaction} />);
            }).toThrow();

            // Cleanup: Restore console.error
            consoleError.mockRestore();
        });

        // Test: transaction object in array is missing 'id' property

        
        // Test: transaction missing all properties (empty object)