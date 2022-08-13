declare module "villageType" {
    interface Village {
        village_id : number,
        title : string,
        phase_no : number,
        phase_name : string,
        content : string,
        role_id : number,
        village_member_limit : number,
        village_member_count : number,
        is_phase_preparing : boolean,
    }
  }