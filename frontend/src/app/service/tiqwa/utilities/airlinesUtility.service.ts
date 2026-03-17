import {
  TiqwaAirlinesUtilitySchema,
  TTiqwaAirlinesUtilityResponse,
} from '@/lib/schemas/server/tiqwa/utilities/airline-utility.schema';
import { TiqwaFetcherUtil } from '@/lib/utils/server/tiqwa-fetcher.util';

export async function airlinesUtilityServiceGET(): Promise<TTiqwaAirlinesUtilityResponse> {
  const response = await TiqwaFetcherUtil('/airlines', {
    method: 'GET',
  });

  return TiqwaAirlinesUtilitySchema.parse(response);
}
