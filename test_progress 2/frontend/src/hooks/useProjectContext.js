import {ProjectContext} from '../context/ProjectContext'
import { useContext } from 'react'

export const useProjectContext=()=>{
  const context = useContext(ProjectContext)

   if(!context){
     throw Error('useProjectContext should be used inside a ProjectContextProvider')
   }
  
  return context
}