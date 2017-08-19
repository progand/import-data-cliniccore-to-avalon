import { ctMotalityId, ptMotalityId } from '../modalities/modalities';

export const ctTemplateEMRRadiologyId = ctMotalityId;
export const ptTemplateEMRRadiologyId = ptMotalityId;

export default [
    {
        id: ctTemplateEMRRadiologyId,
        title: 'Радіологія - CT',
        modalityId: ctMotalityId
    },
    {
        id: ptTemplateEMRRadiologyId,
        title: `Радіологія - PT`,
        modalityId: ptMotalityId
    }
];