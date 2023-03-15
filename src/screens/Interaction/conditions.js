import useGeneralProfile from '../../modules/user_profile/general-profile';

export const useCondition = answers => {
  const {getItem: getProfileItem} = useGeneralProfile();
  const check_single = condition => {
    let cmp;
    if (!condition.on || condition.on === 'answers') {
      cmp = answers[condition.key];
    } else if (condition.on === 'profile') {
      cmp = getProfileItem(condition.key);
    }
    if (cmp === undefined) {
      return condition.default || false;
    }
    switch (condition.op) {
      case 'eq':
        return cmp === condition.value;
      case 'ne':
        return cmp !== condition.value;
      case 'gt':
        return cmp > condition.value;
      case 'gte':
        return cmp >= condition.value;
      case 'lt':
        return cmp < condition.value;
      case 'lte':
        return cmp <= condition.value;
      case 'in':
        return condition.value.includes(cmp);
      case 'nin':
        return !condition.value.includes(cmp);
      default:
        return condition.default || false;
    }
  };

  const check_or_and_collection = collections => {
    return collections
      ? collections.some(collection => collection.every(check_single))
      : true;
  };

  return {check_single, check_or_and_collection};
};
