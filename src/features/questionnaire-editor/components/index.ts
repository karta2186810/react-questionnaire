import { INPUT_CONFIG } from './Input';
import { TITLE_CONFIG } from './Title';
import { PARAGRAPH_CONFIG } from './Paragraph';
import { TEXTAREA_CONFIG } from './Textarea';

export const COMPONENT_CONFIGS = [INPUT_CONFIG, TITLE_CONFIG, PARAGRAPH_CONFIG, TEXTAREA_CONFIG];

export const getConfigByType = (type: string) => COMPONENT_CONFIGS.find((config) => config.type === type);
