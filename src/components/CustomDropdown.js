// CustomDropdown.js
// Custom dropdown component matching chatbot-flow-builder-starter-kit styling

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';

export default function CustomDropdown({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Select...',
  className = ''
}) {
  const selectedOption = options.find(opt => {
    const optValue = typeof opt === 'object' ? opt.value : opt;
    return optValue === value;
  });

  const displayValue = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
    : placeholder;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={`h-8 w-full flex items-center justify-between border border-dark-100 rounded-md bg-dark-300 px-2.5 outline-none transition active:border-dark-200 active:bg-dark-400/50 data-[state=open]:border-dark-200 data-[state=open]:bg-dark-500 data-[state=closed]:hover:bg-dark-300 text-text-primary ${className}`}
        >
          <div className="flex items-center">
            <div className="text-sm font-medium leading-none tracking-wide text-text-primary">
              {displayValue}
            </div>
          </div>

          <ChevronsUpDown className="ml-1 w-3 h-3 opacity-50" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={5}
          style={{ width: 'var(--radix-dropdown-menu-trigger-width)', minWidth: '160px' }}
          className="select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-text-primary shadow-xl backdrop-blur-lg transition z-50 animate-in"
        >
          {options.map((option, index) => {
            const optValue = typeof option === 'object' ? option.value : option;
            const optLabel = typeof option === 'object' ? option.label : option;
            const isSelected = optValue === value;

            return (
              <DropdownMenu.Item
                key={index}
                className={`h-8 flex cursor-pointer items-center border border-transparent rounded-lg p-1.5 pr-6 outline-none transition active:border-dark-200 active:bg-dark-300 hover:bg-dark-200 text-text-primary ${
                  isSelected ? 'bg-dark-200' : ''
                }`}
                onSelect={() => onChange(optValue)}
              >
                <div className="flex items-center gap-x-2">
                  <div className="text-xs font-medium leading-none tracking-wide">
                    {optLabel}
                  </div>
                </div>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

