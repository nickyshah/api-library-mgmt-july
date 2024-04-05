import React, { useState, useEffect } from "react";
import {  ICompany,  ICreateCompany,  ICreateJob,} from "../../Types/global.typing";
import TextField from "@mui/material/TextField/TextField";
import {  Button,  FormControl,  InputLabel,  MenuItem,  Select,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import "./jobs.scss";

const levelArray: string[] = [
  "Intern",
  "Junior",
  "MidLevel",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [job, SetJob] = useState<ICreateJob>({
    title: "",
    level: "",
    companyId: "",
  });

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId ==="") {
      alert("Please fill all the fields");
      return;
    }
    httpModule
      .post("/Job/Create", job)
      .then((response) => redirect("/Jobs"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/Jobs");
  };
  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New Job</h2>

        <TextField
          fullWidth
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => SetJob({ ...job, title: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => SetJob({ ...job, level: e.target.value })}
          >
            {levelArray.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => SetJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
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

export default AddJob;
