import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addToFilters } from '../utils/filterSlice';
import { addToFilteredJobs } from '../utils/jobSlice';
import { useEffect, useState } from 'react';

const FilterConatiner = ()=>{
        let roleOptions = [
            {value:'backend',label:'Back-End',type: 'role'},
            {value:'frontend',label:'Front-end',type: 'role'}
        ];
        const filters =  useSelector(store=>store.filters)
        const jobsData = useSelector(store=>store.jobs.jobsData);
        const scrollToggle = useSelector(store=>store.jobs.scrollToggle)
        const [selectedOption, setSelectedOption] = useState(null);
        const dispatch = useDispatch()

        function handleSelection(e){
            setSelectedOption(e);
            dispatch(addToFilters(e));
        }
        useEffect(()=>{
                if(filters.roles.length>0 || filters.location.length>0){
                    let filteredJobs = jobsData.filter((job)=>{
                        if(!filters.roles.length > 0 || (filters.roles.includes(job.jobRole))){
                            return true;
                        }
                    });
                    dispatch(addToFilteredJobs(filteredJobs));
                }else {
                    dispatch(addToFilteredJobs(jobsData));
                }
        },[filters,scrollToggle])
      


    return (
        <div  className='filter-container'>
            <Select options={roleOptions} value={selectedOption} isMulti={true} onChange={(e)=> handleSelection(e)} placeholder="Roles"/>
            <Select />
            <Select />
            <Select />
            <Select />
            <Select />
            <Select />
        </div>
    )
}

export default FilterConatiner;