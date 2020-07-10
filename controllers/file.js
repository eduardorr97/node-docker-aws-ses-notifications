const fs = require("fs");
const { execSync } = require("child_process");
const ROOT_DIRECTORY = "/usr/src/workspace";
const MARK_FILE = "mark.log";

const markDoneTask = () => {
  try {
    process.chdir(ROOT_DIRECTORY);
    execSync(`rm -rf ${MARK_FILE}`);
    execSync(`echo "DAY=${new Date().getDate()}" >> ${MARK_FILE}`);
  } catch (error) {
    console.log("error on deployProject: ", error);
  }
};

const readMark = (file = `${ROOT_DIRECTORY}/${MARK_FILE}`) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(data);
      }
    });
  });
};

const isMarkToDay = async () => {
  const mark = await readMark();
  console.log("mark: ", mark);
  const markDay = mark && mark.split("=")[1];
  return markDay === new Date().getDate();
};

module.exports = {
  isMarkToDay,
  readMark,
  markDoneTask,
};
