import { object, string, date, number, z } from "zod";
/**
 * @openapi
 * components:
  schemas:
    Project:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
        startDate:
          type: string
          format: date
        endDate:
          type: string
          format: date
        status:
          type: string
        user:
          type: string
        assignedTo:
          type: string
        percentageCompleted:
          type: number
        percentagePending:
          type: number
        priority:
          type: string

 * 
 */

export const projectSchema = object({
  title: string({
    required_error: "Title is required",
  }),
  description: string({
    required_error: "Description is required",
  }),
  startDate: date({
    required_error: "Start Date is required",
  }),
  endDate: date({
    required_error: "End Date is required",
  }),
  status: string(),
  user: string(), 
  assignedTo: string(), 
  percentageCompleted: number(),
  percentagePending: number(),
  priority: string(),
});


export type Project = z.infer<typeof projectSchema>;



