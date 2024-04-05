import React, { useState, useEffect } from "react";
import { ICreateCandidate, IJob } from "../../Types/global.typing";
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
import "./candidate.scss";

const AddCandidate = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [candidates, setCandidates] = useState<ICreateCandidate>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
    jobId: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>();

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

  const handleClickSaveBtn = () => {
      if (candidates.firstName === "" || 
      candidates.lastName === "" || 
      candidates.email === "" || 
      candidates.phoneNumber === "" || 
      candidates.coverLetter === "" || 
      candidates.jobId === ""||
      !pdfFile) 
      {
        alert("Please fill all the fields");
        return;
      }
      const newCandidateFormData = new FormData();
      newCandidateFormData.append("firstName", candidates.firstName);
      newCandidateFormData.append("lastName", candidates.lastName);
      newCandidateFormData.append("email", candidates.email);
      newCandidateFormData.append("phoneNumber", candidates.phoneNumber);
      newCandidateFormData.append("coverLetter", candidates.coverLetter);
      newCandidateFormData.append("jobId", candidates.jobId);
      newCandidateFormData.append("pdfFile", pdfFile);
      httpModule
        .post("/Candidate/Create", newCandidateFormData)
        .then((response) => redirect("/candidates"))
        .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/Candidates");
  };
  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add New Candidate</h2>

        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>
          <Select
            value={candidates.jobId}
            label="Job"
            onChange={(e) => setCandidates({ ...candidates, jobId: e.target.value })}
          >
            {jobs.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidates.firstName}
          onChange={(e) => setCandidates({ ...candidates, firstName: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidates.lastName}
          onChange={(e) => setCandidates({ ...candidates, lastName: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidates.email}
          onChange={(e) => setCandidates({ ...candidates, email: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Phone Number"
          variant="outlined"
          value={candidates.phoneNumber}
          onChange={(e) => setCandidates({ ...candidates, phoneNumber: e.target.value })}
        />

        <TextField
          fullWidth
          autoComplete="off"
          label="Cover Letter"
          variant="outlined"
          value={candidates.coverLetter}
          onChange={(e) => setCandidates({ ...candidates, coverLetter: e.target.value })}
        />
        <input type="file" onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}/>

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
