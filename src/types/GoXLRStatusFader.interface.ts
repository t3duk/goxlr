export interface GoXLRStatusFader {
  channel: string;
  mute_type: string;
  scribble: {
    file_name: string | null;
    button_text: string | null;
    left_text: string | null;
    inverted: boolean;
  };
  mute_state: boolean;
}
