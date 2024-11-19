import { Tab, Tabs, Box } from "@mui/material";
import { User, UserCog } from "lucide-react";
interface ITabs {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

function a11yProps(index: number) {
  return {
    id: `statistics-tab-${index}`,
    "aria-controls": `statistics-tabpanel-${index}`,
  };
}

function UserManageTab({ value, setValue }: ITabs) {
  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="w-[85%] space-y-6">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontSize: "0.95rem",
              fontWeight: 600,
              textTransform: "none",
              minHeight: 48,
            },
            "& .Mui-selected": {
              color: "#2563eb",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          <Tab
            icon={<User className="h-5 w-5" />}
            iconPosition="start"
            label="사용자 목록"
            {...a11yProps(0)}
          />
          <Tab
            icon={<UserCog className="h-5 w-5" />}
            iconPosition="start"
            label="승인 관리"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
    </div>
  );
}

export default UserManageTab;
