import type { EventClickArg } from '@fullcalendar/core/index.js';
import { useState } from 'react';

interface TooltipPosition {
  x: number;
  y: number;
}

interface TooltipData {
  event: EventClickArg['event'];
  position: TooltipPosition;
}

export default function useTooltip() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const showTooltip = (clickInfo: EventClickArg) => {
    const eventEl = clickInfo.el;
    const rect = eventEl.getBoundingClientRect();

    setTooltip({
      event: clickInfo.event,
      position: {
        x: Math.max(20, rect.left - 320),
        y: rect.top + window.scrollY,
      },
    });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  return { tooltip, showTooltip, hideTooltip };
}
