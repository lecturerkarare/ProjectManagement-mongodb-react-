import { Request, Response, NextFunction, response } from "express";
import { User as UserType } from "../types/user";

import { Faq } from "../model/faq";
import { Customer } from "../model/Customer";
import { Workspace, workspaceDocument } from "../model/workspace";
export const CustomerService = {
  async Creatcustomer(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const workspace = await Workspace.findById(id);
      let { name, email, phoneNumber, country, address } = req.body;
      
      let customer = await Customer.create({
        name, 
        email,
       phoneNumber,
        country,
        address,
        workspace:workspace?._id
        
      });
      let result = await customer.save();

      if (result)
        return res
          .status(200)
          .json({ msg: `Successfully created customer in workspace ${workspace?._id}`, result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const workspace = await Workspace.findById(id);
      const result = await Customer.find({workspace: workspace?._id})
        console.log(result);
      if (result)
        return res.status(200).json({
          message: `Customers retrieved successfully`,
          result,
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Customer.findById(id)

      if (!result) return res.status(404).json({ message: " Customer not found" });
      res.status(200).json({ msg: "successfully retrieved Customer ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async UpdateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      let customer = await Customer.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!customer) return res.status(404).json({ message: "Customer not found" });
      res.status(200).json({ message: "Customer updated successfully", customer });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Customer" });
    }
    next();
  },

  async deletecustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
        const data = await Customer.findByIdAndRemove(id);
        if (data){
            return res
              .status(403)
              .json({ msg: "You do not have permission to  delete this customer " });

        }
        
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
};
