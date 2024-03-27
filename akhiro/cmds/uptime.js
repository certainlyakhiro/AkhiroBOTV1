const os = require("os");
const fs = require("fs-extra");

// Capture the bot's start time
const startTime = new Date();

module.exports = {
  config: {
    name: "uptime",
    alianses: ["up", "info"],
    description: "Retrieve system information and check server latency.",
    usage: "uptime",
    author: "Rui | AkhiroDEV",
  },
  onRun: async ({ api, event, fonts }) => {
    try {
      const uptimeInSeconds = (new Date() - startTime) / 1000;

      const seconds = uptimeInSeconds;
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsLeft = Math.floor(seconds % 60);
      const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${secondsLeft}s`;

      const loadAverage = os.loadavg();
      const cpuUsage =
        os
          .cpus()
          .map((cpu) => cpu.times.user)
          .reduce((acc, curr) => acc + curr) / os.cpus().length;

      const totalMemoryGB = os.totalmem() / 1024 ** 3;
      const freeMemoryGB = os.freemem() / 1024 ** 3;
      const usedMemoryGB = totalMemoryGB - freeMemoryGB;

      const systemInfo = `♡   ∩_∩
 （„• ֊ •„)♡
╭─∪∪───────────⟡
│     𝚄𝙿𝚃𝙸𝙼𝙴 𝚂𝚈𝚂𝚃𝙴𝙼
├──────────────⟡
│✧ 𝙱𝙾𝚃 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 ✧
│ 𝙽𝙰𝙼𝙴: 𝙰𝚔𝚑𝚒𝚛𝚘𝙱𝚘𝚝
│ 𝙻𝙰𝙽𝙶: 𝙽𝚘𝚍𝚎𝚓𝚜
│ 𝙿𝚁𝙵𝚇: /
│ 𝙳𝙴𝚅𝚂: 𝙻𝚒𝙰𝙽𝙴, 𝙰𝚔𝚑𝚒𝚛𝚘𝙳𝚎𝚟 & 𝚁𝚞𝚒
├──────────────⟡
│ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 | 𝚄𝙿𝚃𝙸𝙼𝙴𝙳
│  ${uptimeFormatted}
├──────────────⟡
│𝙾𝚂: ${os.type()} ${os.arch()}
│𝙻𝙰𝙽𝙶 𝚅𝙴𝚁: ${process.version}
│𝙲𝙿𝚄 𝙼𝙾𝙳𝙻: ${os.cpus()[0].model}
│𝚂𝚃𝙾𝚁𝙰𝙶𝙴: ${usedMemoryGB.toFixed(2)} GB / ${totalMemoryGB.toFixed(2)} GB
│𝙲𝙿𝚄 𝚄𝚂𝙶𝙴: ${cpuUsage.toFixed(1)}%
│𝚁𝙰𝙼 𝚄𝚂𝙶𝙴: ${process.memoryUsage().heapUsed / 1024 / 1024} MB;
╰──────────────⟡
`;

      // Send message with attachment
      const attachment = fs.createReadStream(__dirname + '/cache/info.mp4');
      api.sendMessage({
        body: systemInfo,
        attachment: attachment
      }, event.threadID, (err, messageInfo) => {
        if (err) {
          console.error("Error sending message with attachment:", err);
        } else {
          console.log("Message with attachment sent successfully:", messageInfo);
        }
      });
    } catch (error) {
      console.error("Error retrieving system information:", error);
      api.sendMessage(
        "Unable to retrieve system information.",
        event.threadID,
        event.messageID
      );
    }
  },
};