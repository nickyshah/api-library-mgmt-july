import "./companies.scss";
import httpModule from "../../helpers/http.module";
import { useEffect, useState } from "react";
import { ICompany } from "../../Types/global.typing";


const Companies = () => {
    const [companies, setCopmanies] = useState<ICompany[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

useEffect(()=>{
    setLoading(true);
    httpModule.get<ICompany[]>("/Company/Get")
    .then(response => )
    .catch()
})
  return (
    <div>Companies.page</div>
  )
}

export default Companies