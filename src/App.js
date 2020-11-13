import React, { useState } from "react";
import { Container } from "react-bootstrap";
import useFetchJobs from "./hooks/useFetchJobs";
import Job from "./components/Job";
import JobsPaginations from "./components/JobsPaginations";
import SearchForm from "./components/SearchForm";

function App() {
  const { jobs, loading, error,hasNextpage } = useFetchJobs();
  const [page,setPage]=useState(1)
  const [params,setParams]=useState({ })

  function handleParamChange(e){
    const param=e.target.name;
    const value=e.target.value;
    setPage(1)
    setParams(prevParams=>{
      return {...prevParams,[param]:value}
    })
  }
  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange}/>
      <JobsPaginations page={page} setPage={setPage} hasNextpage/>
      {loading && <h1> Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
      <JobsPaginations page={page} setPage={setPage} hasNextpage={hasNextpage} />
    </Container>
  );
}

export default App;
