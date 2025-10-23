import { Roles } from "../model/roles";
import { DEFAULT_ROLES } from "../services/roles";

export const DefaultRoles = {
    async createDefaultRoles(){
        try {
          for (const role of DEFAULT_ROLES) {
            const checkExisting = await Roles.findOne({ name: role.name });
      
            if (!checkExisting) {
              const newRole = await Roles.create(role);
              console.log(`Created default role: ${newRole.name}`);
            }
          }
      
          console.log('Default roles creation completed');
        } catch (err) {
          console.error('Error creating default roles:', err);
        }
      },

    //   async  getAllRoles() {
    //     try {
    //         const allRoles = await Roles.find();
    //         console.log(allRoles)
    //         // return allRoles;
    //     } catch (err) {
    //         console.error('Error fetching roles:', err);
    //         throw err;
    //     }
    // }
}
