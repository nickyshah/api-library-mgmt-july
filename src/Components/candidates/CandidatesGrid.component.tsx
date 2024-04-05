import { Box } from "@mui/material";
import "./candidates-grid.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICandidate } from "../../Types/global.typing";
import { baseUrl } from "../../constants/url.constants";
import { PictureAsPdf } from "@mui/icons-material";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 120 },
  { field: "lastName", headerName: "Last Name", width: 120 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  { field: "coverLetter", headerName: "Cover Letter", width: 500 },
  {
    field: "resumeUrl",
    headerName: "Download Resume",
    width: 150,
    renderCell: (params) => (
      <a
        href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`}
        download
      >
        <PictureAsPdf/>
      </a>
    ),
  },
];

interface ICandidatesGridprops {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidatesGridprops) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="candidates-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
