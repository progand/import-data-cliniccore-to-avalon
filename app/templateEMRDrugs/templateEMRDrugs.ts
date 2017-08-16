import { enteralInjectionWayId, parenteralInjectionWayId } from '../injectionWays/injectionWays';

export const bowelContrastingTemplateEMRDrugId = 101;
export const contrastInjectionTemplateEMRDrugId = 102;
export const fdg18InjectionTemplateEMRDrugId = 103;

export default [
    {
        id: bowelContrastingTemplateEMRDrugId,
        title: 'контрастування кишківника per/os',
        injection_way_id: enteralInjectionWayId
    },
    {
        id: contrastInjectionTemplateEMRDrugId,
        title: `інєкція в/в контрасту`,
        injection_way_id: parenteralInjectionWayId
    },
    {
        id: fdg18InjectionTemplateEMRDrugId,
        title: `інєкція 18ФДГ`,
        injection_way_id: parenteralInjectionWayId
    }
];