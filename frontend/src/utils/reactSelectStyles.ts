const reactSelectStyles = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: 'var(--background-color)',
    border: '1px solid var(--secondary-color)',
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    color: 'black',
  }),
  multiValue: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--text-color)',
    backgroundColor: 'var(--secondary-color)',
  }),
  multiValueLabel: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--text-color)',
    backgroundColor: 'var(--secondary-color)',
  }),
  multiValueRemove: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--text-color)',
    backgroundColor: 'var(--secondary-color)',
  }),
};

export default reactSelectStyles;
