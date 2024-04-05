import React, { useState, useEffect } from "react";
import { ICreateCandidate, IJob } from "../../Types/global.typing";
import TextField from "@mui/material/TextField/TextField";
import {  Button,  FormControl,  InputLabel,  MenuItem,  Select,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import "./candidate.scss";

const AddCandidate = () => {
  const[jobs, setJobs] = useState<IJob[]>([]);
  const [candidates, setCandidates] = useState<ICreateCandidate>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
    jobId: "",
  });

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/get")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  // const handleClickSaveBtn = () => {
  //   if (candidates.firstName === "" || candidates.lastName === "" || candidates.email === "" || candidates.phoneNumber === "" || candidates.coverLetter === "" || candidates.jobId === "") {
  //     alert("Please fill all the fields");
  //     return;
  //   }
  //   httpModule
  //     .post("/Candidate/Create", candidates)
  //     .then((response) => redirect("/Jobs"))
  //     .catch((error) => console.log(error));
  // };

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

export default AddCandidate;
