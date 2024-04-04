import React, { useState } from "react";
import { ICreateCompany } from "../../Types/global.typing";
import  TextField  from "@mui/material/TextField/TextField";
import { FormControl, InputLabel } from "@mui/material";

const AddCompany = () => {
  const [company, SetCompany] = useState<ICreateCompany>({
    name: "",
    size: "",
  });
  return (
    <div className="content">
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => SetCompany({ ...company, name: e.target.value })}
        />
        < FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          
        </FormControl>
      </div>
    </div>
  );
};

export default AddCompany;
