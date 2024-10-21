import { GoXLRStatusConfig } from "./GoXLRStatusConfig.interface";
import { GoXLRStatusMixers } from "./GoXLRStatusMixers.interface";
import { GoXLRStatusSample } from "./GoXLRStatusSample.interface";

export interface GoXLRStatus {
  config: GoXLRStatusConfig;
  mixers: GoXLRStatusMixers;
  paths: {
    profile_directory: string;
    mic_profile_directory: string;
    samples_directory: string;
    presets_directory: string;
    icons_directory: string;
    logs_directory: string;
  };
  files: {
    profiles: string[];
    mic_profiles: string[];
    presets: string[];
    samples: GoXLRStatusSample[];
    icons: string[];
  };
}
