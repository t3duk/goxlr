export interface GoXLRStatusConfig {
  http_settings: {
    enabled: boolean;
    bind_address: string;
    cors_enabled: boolean;
    port: number;
  };
  daemon_version: string;
  driver_interface: {
    interface: string;
    version: (number | null)[];
  };
  latest_firmware: {
    Unknown: string | null;
    Full: (number | null)[];
    Mini: (number | null)[];
  };
  locale: {
    user_locale: string | null;
    system_locale: string | null;
  };
  activation: {
    active_path: string;
    app_path: string;
  };
  autostart_enabled: boolean;
  show_tray_icon: boolean;
  tts_enabled: boolean;
  allow_network_access: boolean;
  log_level: string;
  open_ui_on_launch: boolean;
  platform: string;
  handle_macos_aggregates: boolean;
}
