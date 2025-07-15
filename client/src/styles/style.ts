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

export const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  p: 0,
  outline: 'none',
};
