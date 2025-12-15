//Dependencies 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import AddTransactionForm from '../../components/AddTransactionForm';


describe('Test AddTransactionForm Component', () => {
  
  describe('Base Tests', () => {
    
    // Test: Renders form with all input fields
    test('renders form with all input fields', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // All inputs are present
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Amount (use - for withdrawals)')).toBeInTheDocument();
      
      // Date input exists
      const dateInput = container.querySelector('input[type="date"]');
      expect(dateInput).toBeInTheDocument();
    });


    // Test: Renders submit button
    test('renders submit button', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Submit button exists
      const submitButton = screen.getByRole('button', { name: /add transaction/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });


    // Test: Successful form submission calls postTransaction with correct data
    test('successful form submission calls postTransaction with correct data', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values directly
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Coffee';
      categoryInput.value = 'Food';
      amountInput.value = '-5.50';
      
      // Submit form
      fireEvent.submit(form);
      
      // postTransaction called with correct data
      expect(mockPostTransaction).toHaveBeenCalledWith({
        date: '2019-12-01',
        description: 'Coffee',
        category: 'Food',
        amount: '-5.50'
      });
      expect(mockPostTransaction).toHaveBeenCalledTimes(1);
    });


    // Test: Form resets after successful submission
    test('form resets after successful submission', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Coffee';
      categoryInput.value = 'Food';
      amountInput.value = '-5.50';
      
      // Submit form
      fireEvent.submit(form);
      
      // Form fields are cleared
      expect(descriptionInput.value).toBe('');
      expect(categoryInput.value).toBe('');
      expect(amountInput.value).toBe('');
      expect(dateInput.value).toBe('');
    });

  });


  describe('Edge Cases', () => {
    
    // Test: Submits transaction with negative amount (expense)
    test('submits transaction with negative amount', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values with negative amount
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Expense';
      categoryInput.value = 'Food';
      amountInput.value = '-100';
      
      // Submit form
      fireEvent.submit(form);
      
      // postTransaction called with negative amount
      expect(mockPostTransaction).toHaveBeenCalledWith(
        expect.objectContaining({ amount: '-100' })
      );
    });


    // Test: Submits transaction with positive amount (income)
    test('submits transaction with positive amount', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values with positive amount
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Paycheck';
      categoryInput.value = 'Income';
      amountInput.value = '1000';
      
      // Submit form
      fireEvent.submit(form);
      
      // postTransaction called with positive amount
      expect(mockPostTransaction).toHaveBeenCalledWith(
        expect.objectContaining({ amount: '1000' })
      );
    });


    // Test: Submits transaction with decimal amount
    test('submits transaction with decimal amount', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values with decimal amount
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Coffee';
      categoryInput.value = 'Food';
      amountInput.value = '-0.01';
      
      // Submit form
      fireEvent.submit(form);
      
      // postTransaction called with decimal amount
      expect(mockPostTransaction).toHaveBeenCalledWith(
        expect.objectContaining({ amount: '-0.01' })
      );
    });
  });


  describe('Fail Cases', () => {
    let alertSpy;

    beforeEach(() => {
      // Mock window.alert before each test
      alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      // Restore window.alert after each test
      alertSpy.mockRestore();
    });


    // Test: Empty form submission shows alert
    test('empty form submission shows alert', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Submit empty form
      const form = container.querySelector('form');
      fireEvent.submit(form);
      
      // Alert called with correct message
      expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
      
      // postTransaction NOT called
      expect(mockPostTransaction).not.toHaveBeenCalled();
    });


    // Test: Future date shows alert and prevents submission
    test('future date shows alert and prevents submission', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Get tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values with future date
      dateInput.value = tomorrowString;
      descriptionInput.value = 'Future Transaction';
      categoryInput.value = 'Food';
      amountInput.value = '-10';
      
      // Submit form
      fireEvent.submit(form);
      
      // Alert called with correct message
      expect(alertSpy).toHaveBeenCalledWith('Transaction date cannot be in the future');
      
      // postTransaction NOT called
      expect(mockPostTransaction).not.toHaveBeenCalled();
    });


    // Test: Zero amount shows alert and prevents submission
    test('zero amount shows alert and prevents submission', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const categoryInput = screen.getByPlaceholderText('Category');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Set values with zero amount
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Zero Transaction';
      categoryInput.value = 'Food';
      amountInput.value = '0';
      
      // Submit form
      fireEvent.submit(form);
      
      // Alert called with correct message
      expect(alertSpy).toHaveBeenCalledWith('Amount cannot be zero');
      
      // postTransaction NOT called
      expect(mockPostTransaction).not.toHaveBeenCalled();
    });


    // Test: Missing one field shows alert and prevents submission
    test('missing one field shows alert and prevents submission', () => {
      // Mock function
      const mockPostTransaction = vi.fn();
      
      // Render component
      const { container } = render(<AddTransactionForm postTransaction={mockPostTransaction} />);
      
      // Get form and inputs
      const form = container.querySelector('form');
      const dateInput = container.querySelector('input[type="date"]');
      const descriptionInput = screen.getByPlaceholderText('Description');
      const amountInput = screen.getByPlaceholderText('Amount (use - for withdrawals)');
      
      // Fill form but leave category empty
      dateInput.value = '2019-12-01';
      descriptionInput.value = 'Incomplete Transaction';
      // Category left empty
      amountInput.value = '-10';
      
      // Submit form
      fireEvent.submit(form);
      
      // Alert called with correct message
      expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
      
      // postTransaction NOT called
      expect(mockPostTransaction).not.toHaveBeenCalled();
    });
  });
});