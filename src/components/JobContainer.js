import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFilteredJobs, addToJobs, toggleScroll } from "../utils/jobSlice";
import JobCard from "./JobCard";

const JobContainer = ()=>{
    const dispatch = useDispatch();
    const [offsetDef,setOffset] = useState(0);
    const [JobsList,setJobsList] = useState([]);
    var totalCountRef = useRef(1);
    const jobsData = useSelector(store=>store.jobs.jobsData);
    const filteredJobs = useSelector(store=>store.jobs.filteredJobs)

    async function fetchJobs() {
        
            try {
                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "limit": 10, "offset": offsetDef })
                });
                const data = await response.json();
                if(data && data.jdList){
                    dispatch(addToJobs(data.jdList));
                    setJobsList(prev=> [...prev,...data.jdList]);
                    if(totalCountRef.current === 1){
                        dispatch(addToFilteredJobs(data.jdList));
                        totalCountRef.current= data.totalCount;
                    }
                }
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
       
    }

    function handleScroll(){
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
            if(jobsData.length < totalCountRef.current){
            dispatch(toggleScroll());    
            setOffset(offsetDef+10);
            }
        }
    }

    useEffect(()=>{
        
        fetchJobs();
        window.addEventListener('scroll',handleScroll);

        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[offsetDef]);

    return ( filteredJobs.length>0 &&
        <div className="main-container">
            {
                filteredJobs.map((job,index)=> <JobCard key={index} job={job} index={index}/>)
            }
        </div>
    )
}

export default JobContainer;