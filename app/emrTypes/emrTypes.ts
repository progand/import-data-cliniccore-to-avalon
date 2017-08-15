export const radiologyEMRTypeId = 1;
export const drugEMRTypeId = 2;
export const textEMRTypeId = 3;

export default [
    {
        id: radiologyEMRTypeId,
        title: 'emr_radiology',
        related_name: 'emr_radiology'
    },
    {
        id: drugEMRTypeId,
        title: 'emr_drug',
        related_name: 'emr_drug'
    },
    {
        id: textEMRTypeId,
        title: 'emr_text',
        related_name: 'emr_text'
    }
];