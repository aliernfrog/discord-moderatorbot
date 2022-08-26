module.exports = {
  name: "rateLimit",
  execute(data) {
    if (data.timeout > 1000) process.kill(1);
  }
}