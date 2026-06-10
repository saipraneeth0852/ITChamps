module.exports = {
  apps: [
    {
      name: "itchamps",
      script: ".next/standalone/server.js",
      cwd: "/var/www/itchamps",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: 3000,
      },
      max_memory_restart: "512M",
      restart_delay: 3000,
      log_file: "/var/log/itchamps/combined.log",
      out_file: "/var/log/itchamps/out.log",
      error_file: "/var/log/itchamps/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
