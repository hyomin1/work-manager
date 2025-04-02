import { TableBody as MuiTableBody, TableCell, TableRow } from "@mui/material";
import { WorkStatus } from "../../types/work";

type Props = {
  works: WorkStatus[];
  refetch: () => void;
};

export default function TableBody({ works, refetch }: Props) {
  return (
    <MuiTableBody>
      {works.map((work, index) => (
        <TableRow key={work._id}>
          <TableCell>{work.username}</TableCell>
          <TableCell>{work.destination}</TableCell>
          <TableCell>{work.business}</TableCell>
          <TableCell>{work.car}</TableCell>
          <TableCell>{work.business}</TableCell>
          <TableCell>{work.remarks}</TableCell>
        </TableRow>
      ))}
    </MuiTableBody>
  );
}
