import { GoXLRStatusSample } from "./GoXLRStatusSample.interface";

export interface GoXLRStatusSamplerButton {
  function: string;
  order: string;
  samples: GoXLRStatusSample[];
  is_playing: boolean;
  is_recording: boolean;
}
