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
        exists_phase_end_setting : boolean,
        exists_phase_start_setting : boolean,
        exists_phase_setting : boolean,
        is_necessary_to_set_phase_end_setting : boolean,
        is_necessary_to_set_phase_setting : boolean,
        is_necessary_to_set_phase_start_setting : boolean,
    }
  }