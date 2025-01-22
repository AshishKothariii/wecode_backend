const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const psTree = require("ps-tree");

const outputPath = path.join(__dirname, "outputs");
const codesPath = path.join(__dirname, "codes");
const inputsPath = path.join(__dirname, "inputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
if (!fs.existsSync(codesPath)) {
  fs.mkdirSync(codesPath, { recursive: true });
}
if (!fs.existsSync(inputsPath)) {
  fs.mkdirSync(inputsPath, { recursive: true });
}

const isPathAllowed = (filePath) => {
  const absolutePath = path.resolve(filePath);
  return (
    absolutePath.startsWith(codesPath) ||
    absolutePath.startsWith(outputPath) ||
    absolutePath.startsWith(inputsPath)
  );
};

const deleteFiles = (filePaths) => {
  filePaths.forEach((filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error.message);
    }
  });
};

const killProcessTree = (pid, callback) => {
  psTree(pid, (err, children) => {
    if (err) {
      console.error(`Error getting process tree for PID ${pid}:`, err.message);
      return callback(err);
    }

    children.forEach((child) => {
      try {
        process.kill(child.PID, "SIGKILL");
        console.log(`Killed child process: ${child.PID}`);
      } catch (error) {
        console.error(
          `Error killing child process ${child.PID}:`,
          error.message
        );
      }
    });

    try {
      process.kill(pid, "SIGKILL");
      console.log(`Killed main process: ${pid}`);
    } catch (error) {
      console.error(`Error killing main process ${pid}:`, error.message);
    }

    callback(null);
  });
};

const killProcessAndDeleteFiles = (process, filePaths, delay = 100) => {
  killProcessTree(process.pid, (err) => {
    if (err) {
      console.error("Error killing process tree:", err.message);
    }

    setTimeout(() => {
      deleteFiles(filePaths);
    }, delay);
  });
};

const executeCpp = (code, inputs, outputs, submissionId) => {
  const timeLimit = 1000;
  const memoryLimit = 5 * 1024;
  const filepath = path.join(codesPath, `${submissionId}.cpp`);
  const outPath = path.join(outputPath, `${submissionId}.exe`);

  fs.writeFileSync(filepath, code);
  console.log(`Code written to file: ${filepath}`);

  if (!isPathAllowed(filepath)) {
    return Promise.reject({
      errorMsg: "SECURITY_ERROR",
      failed_at: 0,
      passed: 0,
    });
  }

  return new Promise((resolve, reject) => {
    const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
    console.log(`Compiling: ${compileCommand}`);
    exec(compileCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Compilation Error:", error.message);
        deleteFiles([filepath]);
        return resolve({
          errorMsg: "Compilation Error",
          failed_at: 0,
          passed: 0,
        });
      }

      let passedCount = 0;

      const executeTestCase = (index) => {
        if (index >= inputs.length) {
          deleteFiles([filepath]);
          return resolve({
            errorMsg: null,
            failed_at: null,
            passed: passedCount,
          });
        }

        const input = inputs[index];
        const expectedOutput = outputs[index];
        const inputFilePath = path.join(
          inputsPath,
          `input_${submissionId}_${index + 1}.txt`
        );
        fs.writeFileSync(inputFilePath, input);
        console.log(`Input written to file: ${inputFilePath}`);

        const runCommand = `ulimit -v ${memoryLimit} && "${outPath}" < "${inputFilePath}"`;
        console.log(`Executing: ${runCommand}`);
        let outputData = "";

        const process = exec(runCommand, { timeout: timeLimit + 100 });

        process.stdout.on("data", (data) => {
          outputData += data.toString();
          console.log(outputData);
        });

        process.stderr.on("data", (data) => {
          console.error("Execution Error:", data);
          if (data.includes("std::bad_alloc")) {
            killProcessAndDeleteFiles(process, [
              filepath,
              outPath,
              inputFilePath,
            ]);
            return resolve({
              errorMsg: "MLE",
              failed_at: index + 1,
              passed: passedCount,
            });
          }
        });

        process.on("exit", (code, signal) => {
          console.log(`Process exited with code ${code} and signal ${signal}`);

          if (signal === "SIGTERM") {
            killProcessAndDeleteFiles(process, [
              filepath,
              outPath,
              inputFilePath,
            ]);
            return resolve({
              errorMsg: "TLE",
              failed_at: index + 1,
              passed: passedCount,
            });
          }

          if (outputData.trim() !== expectedOutput.trim()) {
            killProcessAndDeleteFiles(process, [
              filepath,
              outPath,
              inputFilePath,
            ]);
            return resolve({
              errorMsg: "WA",
              failed_at: index + 1,
              passed: passedCount,
            });
          }

          passedCount++;
          deleteFiles([inputFilePath]);
          executeTestCase(index + 1);
        });
      };

      executeTestCase(0);
    });
  });
};
module.exports = { executeCpp };
