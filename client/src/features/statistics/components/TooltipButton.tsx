import { Button, Tooltip } from '@mui/material';
import { FileText } from 'lucide-react';

interface Props {
  remarks: string;
}

export default function TooltipButton({ remarks }: Props) {
  return (
    <div className='flex h-full items-center justify-center'>
      {remarks ? (
        <Tooltip
          title={remarks}
          arrow
          placement='left'
          slotProps={{
            tooltip: {
              onClick: (e) => e.stopPropagation(),
              sx: {
                bgcolor: '#374151',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                borderRadius: '6px',
                maxWidth: '500px',
                fontSize: '14px',
                lineHeight: '1.5',
                padding: '12px 16px',
                '& .MuiTooltip-arrow': {
                  color: '#374151',
                },
                '&:focus': {
                  outline: '2px solid #2563eb',
                  outlineOffset: '2px',
                },
              },
            },
          }}
        >
          <Button
            sx={{
              minWidth: 'auto',
              padding: '4px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.04)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
              },
            }}
          >
            <FileText size={22} color='#0D9488' />
          </Button>
        </Tooltip>
      ) : (
        <div className='h-[30px] w-[30px]' />
      )}
    </div>
  );
}
