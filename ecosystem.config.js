module.exports = {
  apps : [{
    name   : "cfg-24-server",
    script : "./server.js",
    cwd    : "./server",
  },
  {
    name   : "cfg-24-frontend",
    script: "npm",
    args : "start",
    cwd: "./client"
  }
  ]
}
