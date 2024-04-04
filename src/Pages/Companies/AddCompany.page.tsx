import React, { useState } from "react";
import { ICreateCompany } from "../../Types/global.typing";
import TextField from "@mui/material/TextField/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddCompany = () => {
  const [company, SetCompany] = useState<ICreateCompany>({
    name: "",
    size: "",
  });

  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Please fill all the fields");
      return;
    }
    httpModule
      .post("/Company/Create", company)
      .then((response) => redirect("/Companies"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/Companies");
  };
  return (
    <div className="content">
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => SetCompany({ ...company, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          <Select
            value={company.size}
            label="Company Size"
            onChange={(e) => SetCompany({ ...company, size: e.target.value })}
          >
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
