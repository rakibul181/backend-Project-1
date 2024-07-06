 
import { TSchedule } from "./OfferedCourse.interface"



export const hasTimeConflict = (assignedSchedule:TSchedule[], newSchedule:TSchedule)=>{
    for(const schedule of assignedSchedule){
 
        const existingStartTime = new Date(`2001:07:13T${schedule.startTime}`)
        const existingEndTime = new Date(`2001:07:13T${schedule.endTime}`)
        const newStartTime = new Date(`2001:07:13T${newSchedule.startTime}`)
        const newEndTime = new Date(`2001:07:13T${newSchedule.endTime}`)
        if(newStartTime>existingEndTime && newEndTime>existingStartTime ){
           return true
        }
      }


      return false

}