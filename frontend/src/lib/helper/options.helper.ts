import { CONTINENT_LABELS } from '../schemas/enums/labels/select-labels.enum';
import { CONTINENTS } from '../schemas/enums/select-types.enum';

export const continentOptions = CONTINENTS.map((value) => ({
  value,
  label: CONTINENT_LABELS[value],
}));
