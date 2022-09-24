declare module "villageType" {
    interface Village {
        village_id : number,
        title : string,
        phase_no : number,
        phase_name : string,
        content : string,
        note : string,
        requirement : string,
        role_id : number,
        village_member_limit : number,
        village_member_count : number,
        core_member_limit : number,
        core_member_count : number,
        rise_member_count : number,
        is_phase_preparing : boolean,
        exists_phase_end_setting : boolean,
        exists_phase_start_setting : boolean,
        exists_phase_setting : boolean,
        is_necessary_to_set_phase_end_setting : boolean,
        is_necessary_to_set_phase_setting : boolean,
        is_necessary_to_set_phase_start_setting : boolean,
        is_task_done? : boolean,
        phase_start_setting? : {
            by_manual: phaseSettingItem,
            by_instant:phaseSettingItem,
            by_date:phaseSettingItem,
        }
        phase_end_setting? : {
            by_manual:phaseSettingItem,
            by_limit:phaseSettingItem,
            by_date:phaseSettingItem,
        },
        categories? : Category[],
    }
    interface phaseSettingItem{
        is_need : boolean,
        label : string,
        is_selected : boolean,
        date? : string,
    }
    interface Category{
        category_name : string,
        category_id? : number,
        opinions? : Opinion[] 
        policy? : Policy,
    }
    interface Opinion{
        opinion_id : number,
        opinion : string,
        member : MemberDetail
        evaluations? : Evaluation[],
    }
    interface MyOpinion{
        category_id : number,
        opinion_id : number,
        opinion : string,
    }
    interface MemberDetail{
        user_id : number,
        role_id : number,
        nickname : string,
        age? : number,
        gender? : number,
    }
    interface Evaluation{
        value : number,
        user_id : number,
    }
    interface Policy{
        policy_id : number,
        policy : string
    }
  }