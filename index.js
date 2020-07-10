const { markDoneTask, isMarkToDay } = require("./controllers/file");

// Email Sender Configs
const { EmailSender } = require("./controllers/ses_email");
const ses_email = new EmailSender();
const template = require("./template");

const DDPController = require("./controllers/ddp");
const CONFIG = {
  APP_NAME: process.env.APP_NAME,
  APP_INSTANCE: process.env.APP_INSTANCE,
  COLLECTIONS: {
    collectionName: process.env.COLLECTION_NAME,
    subscriptionName: process.env.SUBSCRIPTION_NAME,
  },
  DEPLOY: {
    host: process.env.DEPLOY_HOST,
    port: parseInt(process.env.DEPLOY_PORT),
    ssl: process.env.DEPLOY_SSL === "true",
    credentials: {
      user: process.env.DEPLOY_USER,
      password: process.env.DEPLOY_PASSWORD,
    },
  },
};
const { collectionName, subscriptionName } = CONFIG.COLLECTIONS;
const ddpController = new DDPController(CONFIG);

// Constants
const IT_FREQUENCY =
  parseInt(process.env.IT_FREQUENCY) || 2;
const IT_EMAIL_LIST =
  process.env.IT_EMAIL_LIST

const ADMIN_FREQUENCY =
  parseInt(process.env.ADMIN_FREQUENCY) || 7;
const ADMIN_EMAIL_LIST =
  process.env.ADMIN_EMAIL_LIST

const formatElement = (element) => ({
  name: element.firstName + ` ` + element.lastName,
  contract: (element.contract.fol && element.contract.fol) || "Not Contract",
  date: new Date(element.createdAt).toLocaleDateString(),
  club: (element.clubDoc.name && element.clubDoc.name) || "Not Club",
});

const loadElements = (employees) => {
  let elements = [];
  employees.forEach((employee) => {
    elements.push(formatElement(employee));
  });
  return elements;
};

const processEmployees = async (
  employees = [],
  destinations = [],
  days = 2,
  emailfrom
) => {
  try {
    let elements = loadElements(employees);
    if (!Array.isArray(elements) || elements.length < 1) return;
    let email = template(elements, days);
    await ses_email.sendEmail(
      destinations,
      email.subject,
      email.html,
      emailfrom
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const date_diff_indays = (date1, date2) => {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
};

const isDaysDifference = (check, difference) => {
  let date = new Date();
  date.setDate(date.getDate() + -difference);
  let checkDate = new Date(check);
  const diff = date_diff_indays(checkDate, date);
  return difference === ADMIN_FREQUENCY
    ? diff === difference
    : diff >= difference;
};

const isValidData = (element) =>
  element.firstName &&
  element.lastName &&
  element.contract &&
  element.createdAt &&
  element.clubDoc;

const notify = async (days = 2, destinations = [], from) => {
  try {
    const filter = (employee) =>
      (!employee.discarded || !employee.discarded.status) &&
      employee.status === STATUS_PROCESSABLE &&
      (!employee.tutorials || !employee.tutorials[0]) &&
      isValidData(employee) &&
      isDaysDifference(employee.createdAt, days);

    const employees = await ddpController.request(collectionName, subscriptionName, filter);
    console.log("employees: ", (employees && employees.length) || 0);

    await processEmployees(employees, destinations, days, from);
  } catch (error) {
    throw error;
  }
};

(async () => {
  try {
    console.log("init...");

    if (await isMarkToDay()) return;
    console.log("working today...");

    await ddpController.connect();
    console.log("ddp connected...");

    await notify(
      IT_FREQUENCY,
      IT_EMAIL_LIST,
      IT_EMAIL_LIST
    );
    console.log("IT notificated...");

    await notify(
      ADMIN_FREQUENCY,
      ADMIN_EMAIL_LIST,
      ADMIN_EMAIL_LIST
    );
    console.log("Administration notificated...");

    markDoneTask();
    console.log("Mark today worked...");
  } catch (error) {
    console.log(error);
  }
})();

