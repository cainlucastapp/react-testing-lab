//Dependencies 
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import Search from '../../components/Search';
import Sort from '../../components/Sort';


describe('Test Search Component', () => {
  
  describe('Base Tests', () => {
    
    // Test: Renders search input with correct placeholder
    test('renders search input with correct placeholder', () => {
      // Mock function
      const mockSetSearch = vi.fn();
      
      // Render component
      render(<Search setSearch={mockSetSearch} />);
      
      // Input renders with correct placeholder
      const searchInput = screen.getByPlaceholderText('Search your Recent Transactions');
      expect(searchInput).toBeInTheDocument();
      
      // Input is a text input
      expect(searchInput).toHaveAttribute('type', 'text');
    });


    // Test: Calls setSearch with correct value when user types
    test('calls setSearch with correct value when user types', async () => {
      // Setup user event
      const user = userEvent.setup();
      
      // Mock function
      const mockSetSearch = vi.fn();
      
      // Render component
      render(<Search setSearch={mockSetSearch} />);
      
      // Find input and type
      const searchInput = screen.getByPlaceholderText('Search your Recent Transactions');
      await user.type(searchInput, 'coffee');
      
      // setSearch called multiple times (once per character)
      expect(mockSetSearch).toHaveBeenCalled();
      
      // Last call should be with full text
      expect(mockSetSearch).toHaveBeenLastCalledWith('coffee');
    });

  });


  describe('Edge Cases', () => {
    
    // Test: Handles empty search input (clearing search)
    test('handles empty search input', async () => {
      // Setup user event
      const user = userEvent.setup();
      
      // Mock function
      const mockSetSearch = vi.fn();
      
      // Render component
      render(<Search setSearch={mockSetSearch} />);
      
      // Find input, type, then clear
      const searchInput = screen.getByPlaceholderText('Search your Recent Transactions');
      await user.type(searchInput, 'test');
      await user.clear(searchInput);
      
      // setSearch should be called with empty string
      expect(mockSetSearch).toHaveBeenLastCalledWith('');
    });
  });
});


describe('Test Sort Component', () => {
  
  describe('Base Tests', () => {
    
    // Test: Renders select dropdown with both options
    test('renders select dropdown with both options', () => {
      // Mock function
      const mockOnSort = vi.fn();
      
      // Render component
      render(<Sort onSort={mockOnSort} />);
      
      // Select element renders
      const selectElement = screen.getByRole('combobox');
      expect(selectElement).toBeInTheDocument();
      
      // Both options are present
      expect(screen.getByRole('option', { name: 'Description' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Category' })).toBeInTheDocument();
      
      // Description is default selected
      expect(screen.getByRole('option', { name: 'Description' })).toHaveAttribute('value', 'description');
    });


    // Test: Calls onSort with correct value when option selected
    test('calls onSort with correct value when option selected', async () => {
      // Setup user event
      const user = userEvent.setup();
      
      // Mock function
      const mockOnSort = vi.fn();
      
      // Render component
      render(<Sort onSort={mockOnSort} />);
      
      // Find select and choose "Category"
      const selectElement = screen.getByRole('combobox');
      await user.selectOptions(selectElement, 'category');
      
      // onSort called with correct value
      expect(mockOnSort).toHaveBeenCalledWith('category');
      expect(mockOnSort).toHaveBeenCalledTimes(1);
    });
  });


  describe('Edge Cases', () => {
    
    // Test: Handles switching between sort options
    test('handles switching between sort options', async () => {
      // Setup user event
      const user = userEvent.setup();
      
      // Mock function
      const mockOnSort = vi.fn();
      
      // Render component
      render(<Sort onSort={mockOnSort} />);
      
      // Find select element
      const selectElement = screen.getByRole('combobox');
      
      // Select Category
      await user.selectOptions(selectElement, 'category');
      expect(mockOnSort).toHaveBeenCalledWith('category');
      
      // Switch back to Description
      await user.selectOptions(selectElement, 'description');
      expect(mockOnSort).toHaveBeenCalledWith('description');
      
      // onSort called twice total
      expect(mockOnSort).toHaveBeenCalledTimes(2);
    });
  });
});