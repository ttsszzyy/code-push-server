var os = require('os');

var config = {};
config.test = {
  db: {
    username: "root",
    password: "111111",
    database: "codepush",
    host: "192.168.10.108",
    port: 3306,
    dialect: "mysql",
    logging: false,
    operatorsAliases: false,
  },
  local: {
    // storageDir: os.tmpdir(),
    storageDir: "/Users/yangyang/Documents/workspace/reactnative/code-push-server/data",
    downloadUrl: "http://192.168.10.193:3000/download",
    public: '/download'
  },
  jwt: {
    tokenSecret: 'FCC00965E59F745278D8A375027E7687C6F453A8DB6644E8C53AC59CE7F2295C'
  },
  common: {
    tryLoginTimes: 10,
    diffNums: 3,
    dataDir: "/Users/yangyang/Documents/workspace/reactnative/code-push-server/data",
    storageType: "local",
    updateCheckCache: true,
    rolloutClientUniqueIdCache: false,
  },
  smtpConfig: false,
  redis: {
    default: {
      host: "192.168.10.108",
      port: 6379,
      retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            return undefined;
        }
        return Math.max(options.attempt * 100, 3000);
      }
    }
  }
}
config.test.log4js = {
  appenders: {console: { type: 'console'}},
  categories : {
    "default": { appenders: ['console'], level:'error'},
    "startup": { appenders: ['console'], level:'info'},
    "http": { appenders: ['console'], level:'info'},
    "cps:ClientManager":{appenders: ['console'], level:'debug'}
  }
}
module.exports = config;
