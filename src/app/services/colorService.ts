import { appConst } from "../const/appConst";

export class ColorService {

    static bgRoleColre(role_id : number) : string {
        switch (role_id) {
          case appConst.member.role.host:
            return 'bg-host';
          case appConst.member.role.villageMember:
            return 'bg-village';  
          case appConst.member.role.coreMember:
            return 'bg-core';  
          case appConst.member.role.riseMember:
              return 'bg-rise';  
          default:
            break;
        }
        return ''
      }
}