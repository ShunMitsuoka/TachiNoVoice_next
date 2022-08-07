import { myVillageType } from '@/pages/member/village/my/details/[id]';
import { useMemo } from 'react';

export const usePhaseComponent = (phaseId:number, village:myVillageType) => {

    const title: string = useMemo(() => {
        let result = '';
        switch (phaseId) {
            case 1:
                result = 'ビレッジメンバー募集';
                break;
            case 2:
                result = 'メンバー抽選';
                break;
            case 3:
                result = 'コアメンバー意見募集';
                break;
            case 4:
                result = 'カテゴリー分け';
                break;
            case 5:
                result = 'ライズメンバー意見募集';
                break;
            case 6:
                result = '評価';
                break;
            case 7:
                result = '方針決定';
                break;
            case 8:
                result = '満足度調査';
                break;
            default:
                break;
        }
        return result;
    }, []);

    const isActive : boolean = useMemo(() => {
        return village.phase == phaseId
      }, [village]);

  return {title, isActive};
}
