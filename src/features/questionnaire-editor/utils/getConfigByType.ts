import { COMPONENT_CONFIGS } from '../components';

export const getConfigByType = (type: string) => {
  return COMPONENT_CONFIGS.find((config) => config.type === type);
};
