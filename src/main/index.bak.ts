import { app, BrowserWindow } from 'electron';
import child_process, { ChildProcess } from 'child_process';
import spawn from 'cross-spawn';
import findProcess from 'find-process';

let serverProcess: ChildProcess;
let serverPort: any;


// 创建窗口
function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.on('closed', () => {
    win = null as any;
  });

  // serverProcess = child_process.exec('npm run start:server', function (error, stdout, stderr) {
  //   if (error) {
  //     // console.log(process.pid);
  //     console.log(error.stack);
  //     return;
  //   }

  //   console.log(`打印stdout信息：${stdout}`);
  //   console.log(`stderr： ${stderr}`);
  //   console.log(`process.id：${process.pid}`);
  // });

  // serverProcess = spawn('npm', ['run', 'start:server'], {
  //   stdio: 'inherit'
  // });
  serverProcess = spawn('npm', ['run', 'start:server']);

  // 输出到文件
  // const stdoutStream = fs.createWriteStream(escape(stdoutFilePath));
  // serverProcess.stdout!.pipe(stdoutStream, {end: false});
  // serverProcess.stderr!.pipe(stdoutStream, {end: false});

  // 输出到主进程控制台
  // serverProcess.stdout!.pipe(process.stdout);
  // serverProcess.stderr!.pipe(process.stderr);

  // 监听子进程输出信息
  serverProcess.stdout!.on('data', (data) => {
    console.log(data.toString());
    const matchs = /server starting at port:::(\d.+)/.exec(data);

    if (matchs && matchs[1]) {
      serverPort = parseInt(matchs[1]);
    }
  })
  serverProcess.stderr!.on('data', (error) => {
    const errorStr = error.toString();
    console.log(errorStr)
    const matchs = /Error: listen EADDRINUSE: address already in use :::(\d.+)/.exec(errorStr);
    if (matchs && matchs[1]) {
      serverPort = parseInt(matchs[1]);
      // app.quit();
      findProcess('port', serverPort)
        .then((pids) => {
          pids.forEach(item => {
            process.kill(item.pid);
          });

          let time = 3;
          setInterval(function () {
            console.log(`${time--} seconds after will restart...`);
            if (time === 0) {
              spawn('npm', ['run', 'start'], {
                detached: true, //让父进程退出后，子进程能独立运行
                // windowsHide: true
              });

              app.quit();
            }
          }, 1000)
        });
    }
  })

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (serverPort) {
    // 杀掉server进程
    findProcess('port', serverPort)
      .then((pids) => {
        pids.forEach(item => {
          process.kill(item.pid);
          process.exit();
        });
      });
  }

  // serverProcess.kill();
  // process.exit();
  // app.exit();
});

app.on('before-quit', () => {

})

app.on('quit', () => {
  console.log('quit...');
})

// https://nodejs.org/api/readline.html#readline_event_sigint
// if (process.platform === "win32") {
//   var rl = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.on("SIGINT", function () {
//     console.log(33333)
//     process.emit("disconnect");
//   });
// }

  // process.on("SIGINT", function () {
  //   //graceful shutdown
  //   process.exit();
  // });

  // process.on("SIGINT", function () {
  //   // graceful shutdown
  //   process.exit();
  // });

  // process.on('SIGKILL', function (data) {
  //   console.log('Exit now!');
  // })

  // process.on('SIGQUIT', function (data) {
  //   console.log('Exit now!');
  // })

  process.on('SIGINT', function (data) {
    console.log('SIGINT!');
  })

  process.on('exit', function (data) {
    console.log('Exit now!');
  })
