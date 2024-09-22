import { GoXLRStatusFader } from "./GoXLRStatusFader.interface";
import { GoXLRStatusRouter } from "./GoXLRStatusRouter.interface";
import { GoXLRStatusSampleBank } from "./GoXLRStatusSampleBank.interface";

export interface GoXLRStatusMixers {
  [serialNumber: string]: {
    hardware: {
      versions: {
        firmware: number[];
        fpga_count: number;
        dice: number[];
      };
      serial_number: string;
      manufactured_date: string;
      device_type: string;
      colour_way: string;
      usb_device: {
        manufacturer_name: string;
        product_name: string;
        version: number[];
        bus_number: number;
        address: number;
        identifier: string;
      };
    };
    shutdown_commands: [];
    sleep_commands: [];
    wake_commands: [];
    fader_status: {
      A: GoXLRStatusFader;
      B: GoXLRStatusFader;
      C: GoXLRStatusFader;
      D: GoXLRStatusFader;
    };
    mic_status: {
      mic_type: string;
      mic_gains: {
        Dynamic: number;
        Condenser: number;
        Jack: number;
      };
      equaliser: {
        gain: {
          Equalizer63Hz: number;
          Equalizer250Hz: number;
          Equalizer31Hz: number;
          Equalizer2KHz: number;
          Equalizer16KHz: number;
          Equalizer125Hz: number;
          Equalizer500Hz: number;
          Equalizer4KHz: number;
          Equalizer8KHz: number;
          Equalizer1KHz: number;
        };
        frequency: {
          Equalizer8KHz: number;
          Equalizer125Hz: number;
          Equalizer1KHz: number;
          Equalizer2KHz: number;
          Equalizer500Hz: number;
          Equalizer16KHz: number;
          Equalizer63Hz: number;
          Equalizer250Hz: number;
          Equalizer31Hz: number;
          Equalizer4KHz: number;
        };
      };
      equaliser_mini: {
        gain: {
          Equalizer500Hz: number;
          Equalizer1KHz: number;
          Equalizer3KHz: number;
          Equalizer8KHz: number;
          Equalizer90Hz: number;
          Equalizer250Hz: number;
        };
        frequency: {
          Equalizer500Hz: number;
          Equalizer8KHz: number;
          Equalizer3KHz: number;
          Equalizer250Hz: number;
          Equalizer90Hz: number;
          Equalizer1KHz: number;
        };
      };
      noise_gate: {
        threshold: number;
        attack: number;
        release: number;
        enabled: boolean;
        attenuation: number;
      };
      compressor: {
        threshold: number;
        ratio: number;
        attack: number;
        release: number;
        makeup_gain: number;
      };
    };
    levels: {
      submix_supported: boolean;
      output_monitoring: string;
      volumes: {
        Mic: number;
        LineIn: number;
        Console: number;
        System: number;
        Game: number;
        Chat: number;
        Sample: number;
        Music: number;
        Headphones: number;
        MicMonitor: number;
        LineOut: number;
      };
      submix: any;
      bleep: number;
      deesser: number;
    };
    router: {
      Microphone: GoXLRStatusRouter;
      Chat: GoXLRStatusRouter;
      Music: GoXLRStatusRouter;
      Game: GoXLRStatusRouter;
      Console: GoXLRStatusRouter;
      LineIn: GoXLRStatusRouter;
      System: GoXLRStatusRouter;
      Samples: GoXLRStatusRouter;
    };
    cough_button: {
      is_toggle: boolean;
      mute_type: string;
      state: string;
    };
    lighting: {
      animation: {
        supported: boolean;
        mode: string;
        mod1: number;
        mod2: number;
        waterfall_direction: string;
      };
      faders: {
        C: {
          style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        B: {
          style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        A: {
          style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        D: {
          style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
      };
      buttons: {
        EffectSelect1: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        Bleep: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        Cough: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectSelect3: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectMegaphone: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectSelect6: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectRobot: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        Fader4Mute: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        Fader3Mute: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        Fader1Mute: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectFx: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        Fader2Mute: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectSelect4: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectHardTune: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectSelect5: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
        EffectSelect2: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
          };
        };
      };
      simple: {
        Global: {
          colour_one: string;
        };
        Scribble4: {
          colour_one: string;
        };
        Scribble2: {
          colour_one: string;
        };
        Scribble3: {
          colour_one: string;
        };
        Accent: {
          colour_one: string;
        };
        Scribble1: {
          colour_one: string;
        };
      };
      sampler: {
        SamplerSelectC: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
            colour_three: string;
          };
        };
        SamplerSelectB: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
            colour_three: string;
          };
        };
        SamplerSelectA: {
          off_style: string;
          colours: {
            colour_one: string;
            colour_two: string;
            colour_three: string;
          };
        };
      };
      encoders: {
        Reverb: {
          colour_one: string;
          colour_two: string;
          colour_three: string;
        };
        Gender: {
          colour_one: string;
          colour_two: string;
          colour_three: string;
        };
        Pitch: {
          colour_one: string;
          colour_two: string;
          colour_three: string;
        };
        Echo: {
          colour_one: string;
          colour_two: string;
          colour_three: string;
        };
      };
    };
    effects: {
      is_enabled: boolean;
      active_preset: string;
      preset_names: {
        Preset6: string;
        Preset3: string;
        Preset4: string;
        Preset1: string;
        Preset2: string;
        Preset5: string;
      };
      current: {
        reverb: {
          style: string;
          amount: number;
          decay: number;
          early_level: number;
          tail_level: number;
          pre_delay: number;
          lo_colour: number;
          hi_colour: number;
          hi_factor: number;
          diffuse: number;
          mod_speed: number;
          mod_depth: number;
          raw_encoder: number;
        };
        echo: {
          style: string;
          amount: number;
          feedback: number;
          tempo: number;
          delay_left: number;
          delay_right: number;
          feedback_left: number;
          feedback_right: number;
          feedback_xfb_l_to_r: number;
          feedback_xfb_r_to_l: number;
          raw_encoder: number;
        };
        pitch: {
          style: string;
          amount: number;
          character: number;
          raw_encoder: number;
        };
        gender: {
          style: string;
          amount: number;
          raw_encoder: number;
        };
        megaphone: {
          is_enabled: boolean;
          style: string;
          amount: number;
          post_gain: number;
        };
        robot: {
          is_enabled: boolean;
          style: string;
          low_gain: number;
          low_freq: number;
          low_width: number;
          mid_gain: number;
          mid_freq: number;
          mid_width: number;
          high_gain: number;
          high_freq: number;
          high_width: number;
          waveform: number;
          pulse_width: number;
          threshold: number;
          dry_mix: number;
        };
        hard_tune: {
          is_enabled: boolean;
          style: string;
          amount: number;
          rate: number;
          window: number;
          source: string;
        };
      };
    };
    sampler: {
      processing_state: {
        progress: any;
        last_error: any;
      };
      active_bank: string;
      clear_active: boolean;
      record_buffer: number | null;
      banks: {
        A: GoXLRStatusSampleBank;
        B: GoXLRStatusSampleBank;
        C: GoXLRStatusSampleBank;
      };
    };
    settings: {
      display: {
        gate: string;
        compressor: string;
        equaliser: string;
        equaliser_fine: string;
      };
      mute_hold_duration: number;
      vc_mute_also_mute_cm: boolean;
      enable_monitor_with_fx: boolean;
      reset_sampler_on_clear: boolean;
      lock_faders: boolean;
      vod_mode: string;
    };
    button_down: {
      Fader1Mute: boolean;
      Fader2Mute: boolean;
      Fader3Mute: boolean;
      Fader4Mute: boolean;
      Bleep: boolean;
      Cough: boolean;
      EffectSelect1: boolean;
      EffectSelect2: boolean;
      EffectSelect3: boolean;
      EffectSelect4: boolean;
      EffectSelect5: boolean;
      EffectSelect6: boolean;
      EffectFx: boolean;
      EffectMegaphone: boolean;
      EffectRobot: boolean;
      EffectHardTune: boolean;
      SamplerSelectA: boolean;
      SamplerSelectB: boolean;
      SamplerSelectC: boolean;
      SamplerTopLeft: boolean;
      SamplerTopRight: boolean;
      SamplerBottomLeft: boolean;
      SamplerBottomRight: boolean;
      SamplerClear: boolean;
    };
    profile_name: string;
    mic_profile_name: string;
  };
}
