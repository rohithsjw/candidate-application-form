import { useState } from "react";

const JobCard = ({job,index})=>{
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleExpandDescription = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div>
                <div className='job-card' key={index} >
                    <div className='basic-details'>
                        <div>
                            <img className='company-image' src={job.logoUrl} alt='company-logo' />
                        </div>
                        <div className='other-details'>
                            <div>{job.companyName}</div>
                            <div>{job.jobRole}</div>
                            <div>{job.location}</div>
                        </div>
                    </div>
                    <div>Estimated salary: {job.minJdSalary} - {job.maxJdSalary}</div>
                    <div className='job-description' style={{ maxHeight: expandedIndex === index ? 'none' : '250px' }}>
                        <p className='description'>{job.jobDetailsFromCompany}</p>
                    </div>
                    <button style={{position:'relative',left:"130px"}} className='toggle-description' onClick={() => handleExpandDescription(index)}>
                        {expandedIndex === index ? 'Collapse' : 'Expand'}
                    </button>
                    <div className='experience-required'>
                        <label>Minimum Experience: {job.minExp} </label>
                    </div>  
                    <button className='easy-apply'> Esay Apply</button>  
                </div>
        </div>
    )
}

export default JobCard;