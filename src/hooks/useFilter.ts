import {useState} from 'react'

export const useFilter = <T,> (data: T[],key: keyof T) => {
  const [filter, setFilter] = useState<string | 'Todo'>('Todo');

  const filteredData=data.filter((item)=>{
    if (filter==='Todo') return true;
    return item[key]===filter;
  });
  return {filter,setFilter, filteredData}
}
