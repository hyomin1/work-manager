export const CELL_STYLE = {
  fontSize: "large",
  borderRight: "1px solid #e5e7eb",
  color: "slate",
};

export const LAST_CELL_STYLE = {
  fontSize: "large",
  borderRight: "none",
  width: "8%",
};

export const EMPTY_TABLE_CELL_STYLE = {
  color: "#334155",
};

export const TOOLTIP_STYLE = {
  bgcolor: "#374151",
  color: "#ffffff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
  borderRadius: "6px",
  maxWidth: "500px",
  fontSize: "14px",
  lineHeight: "1.5",
  padding: "12px 16px",
  "& .MuiTooltip-arrow": {
    color: "#374151",
  },
  "&:focus": {
    outline: "2px solid #2563eb",
    outlineOffset: "2px",
  },
};

export const REMARK_BUTTON_STYLE = {
  minWidth: "auto",
  padding: "4px",
  borderRadius: "6px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(37, 99, 235, 0.04)",
    transform: "scale(1.05)",
  },
  "&:active": {
    backgroundColor: "rgba(37, 99, 235, 0.08)",
  },
};
