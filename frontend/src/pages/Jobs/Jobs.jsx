import { useEffect, useState } from "react";

import { getJobs } from "../../services/api";

import JobCard from "../../components/JobCard/JobCard";

import FilterBar from "./FilterBar";

import "./Jobs.css";

function Jobs() {

    const [jobs,setJobs]=useState([]);

    const [filteredJobs,setFilteredJobs]=useState([]);

    const [search,setSearch]=useState("");

    const [location,setLocation]=useState("");

    const [jobType,setJobType]=useState("");

    useEffect(()=>{

        loadJobs();

    },[]);

    const loadJobs=async()=>{

        try{

            const data=await getJobs();

            setJobs(data);

            setFilteredJobs(data);

        }

        catch(err){

            console.log(err);

        }

    }

    useEffect(()=>{

        let result=[...jobs];

        if(search){

            result=result.filter(job=>

                job.title.toLowerCase().includes(search.toLowerCase()) ||

                job.skills.toLowerCase().includes(search.toLowerCase())

            );

        }

        if(location){

            result=result.filter(job=>

                job.location.toLowerCase().includes(location.toLowerCase())

            );

        }

        if(jobType){

            result=result.filter(job=>job.job_type===jobType);

        }

        setFilteredJobs(result);

    },[search,location,jobType,jobs]);

    return(

        <div className="jobs-page">

            <div className="jobs-header">

                <h1>Explore AI Jobs</h1>

                <p>

                    Discover jobs perfectly matched to your skills.

                </p>

            </div>

            <FilterBar

                search={search}

                setSearch={setSearch}

                location={location}

                setLocation={setLocation}

                jobType={jobType}

                setJobType={setJobType}

            />

            <div className="jobs-grid">

                {

                    filteredJobs.map(job=>

                        <JobCard

                            key={job.id}

                            job={job}

                        />

                    )

                }

            </div>

        </div>

    );

}

export default Jobs;