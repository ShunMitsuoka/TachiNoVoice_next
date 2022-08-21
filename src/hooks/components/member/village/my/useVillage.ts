import { useState } from 'react';
import { Village } from 'villageType';



export const useVillage = () => {
    const [village, setVillage] = useState<Village>({
        village_id : 0,
        title : '',
        phase_no : 0,
        phase_name : '',
        content : '',
        note : '',
        requirement : '',
        role_id : 0,
        village_member_limit : 0,
        village_member_count : 0,
        is_phase_preparing : false,
        exists_phase_end_setting : false,
        exists_phase_start_setting : false,
        exists_phase_setting : false,
        is_necessary_to_set_phase_end_setting : false,
        is_necessary_to_set_phase_setting : false,
        is_necessary_to_set_phase_start_setting : false,
    });

    return { village, setVillage};
}
