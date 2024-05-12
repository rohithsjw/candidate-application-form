import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addToFilters, clearFilter, removeFromFilters } from '../utils/filterSlice';
import { addToFilteredJobs } from '../utils/jobSlice';
import { useEffect } from 'react';
import { experienceOpts, locationOpts, minBasePayOpts, roleOptions } from '../utils/constants';

const FilterConatiner = ()=>{

        const filters =  useSelector(store=>store.filters);
        const jobsData = useSelector(store=>store.jobs.jobsData);
        const scrollToggle = useSelector(store=>store.jobs.scrollToggle);
        const dispatch = useDispatch()

        function handleSelection(e,context){
            if(context.action === "remove-value"){
                dispatch(removeFromFilters(context.removedValue));
            }else if(context.action === 'clear'){
                dispatch(clearFilter(context.removedValues))
            }else {
                dispatch(addToFilters(context.option || e));
            }
           
        }

        function handleCompanySearch(e){
            let timer;
            return function(e){
                clearTimeout(timer);
                timer = setTimeout(() => {
                    dispatch(addToFilters({value:e.target.value,type:'company'}));
                }, 1000);
            }
        }

        useEffect(()=>{
                if(filters.role.length>0 || filters.location.length>0 || filters.experience.length >0 || filters.salary.length>0 || filters.company.length>0){
                    let filteredJobs = jobsData.filter((job)=>{
                        if(!filters.role.length == 0 && (filters.role.includes(job.jobRole))){
                            return true;
                        }else if(!filters.location.length == 0 && (filters.location.includes(job.location))){
                            return true;
                        }else if(!filters.experience.length ==0 && (filters.experience[0] <= job.minExp)){
                            return true;
                        }else if(!filters.salary.length == 0 && (filters.salary[0] <= job.minJdSalary)){
                            return true;
                        }else if(!filters.company.length ==0&& (filters.company == job.companyName)){
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
            <Select options={roleOptions}  isMulti={true} onChange={(e,context)=> handleSelection(e,context)} placeholder="Roles"/>
            <Select options={locationOpts}  isMulti={true} onChange={(e,context)=> handleSelection(e,context)} placeholder="Location"/>
            <Select options={experienceOpts}  onChange={(e,context)=> handleSelection(e,context)} placeholder="Experience"/>
            <Select options={minBasePayOpts}  onChange={(e,context)=> handleSelection(e,context)} placeholder="Minimum Base salary"/>
            <input type='text' placeholder='Company name' onKeyUp={(e)=>handleCompanySearch(e)(e)}></input>
        </div>
    )
}

export default FilterConatiner;