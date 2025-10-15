import { useEffect } from 'react';

export default function useCalendarStyle() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .fc .fc-toolbar.fc-header-toolbar {
        display: grid;
        grid-template-columns: minmax(auto, 1fr) minmax(auto, 2fr) minmax(auto, 1fr);
      }
      .fc .fc-toolbar-chunk {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .fc .fc-toolbar-chunk:nth-child(2) {
        justify-content: center;
      }
      .fc .fc-toolbar-chunk:last-child {
        justify-content: flex-end;
        gap: 4px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
}
