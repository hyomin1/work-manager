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

export const serviceStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%', // 모바일에서는 화면의 90%
    sm: '500px', // 태블릿 이상에서는 500px 고정
  },
  maxHeight: {
    xs: '90vh', // 모바일에서는 화면 높이의 90%
    sm: '85vh', // 태블릿 이상에서는 화면 높이의 85%
  },
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  p: 0,
  outline: 'none',
};

export const serviceInputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    '&:hover fieldset': {
      borderColor: '#3b82f6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b82f6',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#3b82f6',
  },
};

export const maintenanceTableStyles = {
  tableContainer: {
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    overflow: 'auto', // overflow: hidden에서 auto로 변경
    minWidth: '100%', // 최소 너비 설정
    maxHeight: 'calc(100vh - 300px)', // 최대 높이 설정
  },
  headerCell: {
    backgroundColor: '#f8fafc',
    color: '#475569',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '16px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #e2e8f0',
    minWidth: '100px', // 최소 너비 설정
    '&:first-of-type': {
      // 첫 번째 셀
      minWidth: '120px',
    },
    '&:last-child': {
      // 마지막 셀 (버튼 영역)
      minWidth: '160px',
    },
  },
  cell: {
    fontSize: '0.875rem',
    color: '#334155',
    padding: '16px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #f1f5f9',
    minWidth: '100px', // 최소 너비 설정
    '&:first-of-type': {
      // 첫 번째 셀
      minWidth: '120px',
    },
    '&:last-child': {
      // 마지막 셀 (버튼 영역)
      minWidth: '160px',
    },
  },
  warningCell: {
    fontSize: '0.875rem',
    color: '#ef4444',
    fontWeight: '600',
    padding: '16px',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #f1f5f9',
    minWidth: '100px', // 최소 너비 설정
  },
};

export const userManageTableStyle = {
  '& .MuiTab-root': {
    fontSize: '0.95rem',
    fontWeight: 600,
    textTransform: 'none',
    minHeight: 48,
  },
  '& .Mui-selected': {
    color: '#2563eb',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#2563eb',
  },
};
