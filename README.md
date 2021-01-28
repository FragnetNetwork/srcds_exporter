# NodeJs CSGO Prometheus exporter

## How to install

### Method 1 : Download sources and run

1. Download the repo (using git clone or direct zip download)
2. Enter the srcds_exporter directory and run `npm i`, this will install all required dependencies
3. Start the script with node : `node index.js`, you can create a service or run it in a screen to keep it active in background

### Method 2 : With docker (coming soon)

`docker run -d -p <external port>:9591 --name csgo_exporter FragnetNetwork/csgo_exporter:latest`

## Configure Prometheus

Add the following configuration to Prometheus static configuration :

```
- job_name: 'srcds'
    static_configs:
      - targets: ["<ip>:<port>:<rconpassword>"]


    relabel_configs:
      - source_labels: [__address__]
        regex: "(.+):.+:.+:.+"
        replacement: "$1"
        target_label: __param_ip
      - source_labels: [__address__]
        regex: ".+:(.+):.+:.+"
        replacement: "$1"
        target_label: __param_port
      - source_labels: [__address__]
        regex: ".+:.+:(.+):.+"
        replacement: "$1"
        target_label: __param_password
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: <IP>:<port> # Real exporter's IP:Port
```

## How to access

If you want to see what the exporter returns, you can access :
 
 `http://<ip>:9591/metrics?ip=<srcds ip>&port=<srcds port>&rconPassword=<rcon password>`


