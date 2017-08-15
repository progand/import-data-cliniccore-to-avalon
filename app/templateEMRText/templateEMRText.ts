import emrTypes from '../emrTypes/emrTypes';
const _ = require('lodash');

const textEMRTypeId = _.find(emrTypes, { title: 'emr_text' }).id;
if (_.isUndefined(textEMRTypeId))
    throw new Error('Cant find emr_text in /app/emrTypes/emrTypes');

export default {
    id: 201,
    title: 'Протокол дослідження',
    emrTypeId: textEMRTypeId
}