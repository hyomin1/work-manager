export const inputStyles = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    transition: 'all 0.2s ease-in-out',
    '& fieldset': {
      borderColor: '#E5E7EB',
    },
    '&:hover fieldset': {
      borderColor: '#3B82F6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3B82F6',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#6B7280',
    '&.Mui-focused': {
      color: '#3B82F6',
    },
  },
};
