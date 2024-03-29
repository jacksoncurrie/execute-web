// API Constants
const url = "https://executewebapi.azurewebsites.net/graphql";
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
};

// Cookie functions
const saveCookie = (username, password) => (localStorage.setItem("user", JSON.stringify({ username: username, password: password })));
export const getCookie = () => JSON.parse(localStorage.getItem("user"));
const removeCookie = () => localStorage.removeItem("user");

// Getting data functions
export const login = async (username, password) => {
  opts.body = JSON.stringify({
    query: `
      query GetUserData {
        getUserData(
          username: "${username}",
          password: "${password}"
        ) {
          username
        }
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    // Check username comes back as successful result
    if (res.data.getUserData) {
      console.log("User " + res.data.getUserData.username + " signed in");
      saveCookie(username, password);
      return true;
    } else {
      console.log("Incorrect sign in details");
      removeCookie();
      return false;
    }
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
    return false;
  }
};

export const getThisWeeksSchedule = async (startDate, endDate) => {
  let user = getCookie();
  if (!user) return null;
  opts.body = JSON.stringify({
    query: `
      query GetUserWeekData {
        getUserData(
          username: "${user.username}",
          password: "${user.password}"
          startTime: "${startDate}",
          endTime: "${endDate}"
        ) {
          calendarItems {
            calendarItemID
            title
            startTime
            endTime
          }
          scheduleItems {
            scheduleItemID
            title
            category
            startTime
            endTime
          }
          tasks {
            taskID
            title
            priority
            estimatedTime
            startTime
          }
        }
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    return res.data.getUserData;
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const getAllCalendarItems = async () => {
  let user = getCookie();
  if (!user) return null;
  opts.body = JSON.stringify({
    query: `
      query GetUserData {
        getUserData(username: "${user.username}", password: "${user.password}") {
          calendarItems {
            calendarItemID
            title
            startTime
            endTime
          }
        }
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    return res.data.getUserData.calendarItems;
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const getAllScheduleItems = async () => {
  let user = getCookie();
  if (!user) return null;
  opts.body = JSON.stringify({
    query: `
      query GetUserData {
        getUserData(username: "${user.username}", password: "${user.password}") {
          scheduleItems {
            scheduleItemID
            title
            category
            startTime
            endTime
          }
        }
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    return res.data.getUserData.scheduleItems;
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const getAllTasks = async () => {
  let user = getCookie();
  if (!user) return null;
  opts.body = JSON.stringify({
    query: `
      query GetUserData {
        getUserData(username: "${user.username}", password: "${user.password}") {
          tasks {
            taskID
            title
            priority
            estimatedTime
            startTime
          }
        }
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    return res.data.getUserData.tasks;
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

// Adding API functions
export const addCalendarItem = async (title, startDate, startTime, endDate, endTime) => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation AddCalendarItem {
        addItem(
          username: "${user.username}",
          password: "${user.password}",
          calendarItem: {
            title: "${title}",
            startTime: "${startDate}T${startTime}",
            endTime: "${endDate}T${endTime}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.addItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const addScheduleItem = async (title, category, startTime, endTime) => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation AddScheduleItem {
        addItem(
          username: "${user.username}",
          password: "${user.password}",
          scheduleItem: {
            title: "${title}",
            category: ${category},
            startTime: "${startTime}",
            endTime: "${endTime}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.addItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const addTask = async (title, priority, estimatedTime) => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation AddCalendarItem {
        addItem(
          username: "${user.username}",
          password: "${user.password}",
          task: {
            title: "${title}",
            priority: ${priority},
            estimatedTime: ${estimatedTime}
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.addItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

// Update API functions
export const updateCalendarItem = async (calendarItemID, title, startDate, startTime, endDate, endTime) => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation UpdateCalendarItem {
        updateItem(
          username: "${user.username}",
          password: "${user.password}",
          calendarItem: {
            calendarItemID: "${calendarItemID}",
            title: "${title}",
            startTime: "${startDate}T${startTime}",
            endTime: "${endDate}T${endTime}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.updateItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const updateScheduleItem = async (scheduleItemID, title, category, startTime, endTime) => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation UpdateScheduleItem {
        updateItem(
          username: "${user.username}",
          password: "${user.password}",
          scheduleItem: {
            scheduleItemID: "${scheduleItemID}",
            title: "${title}",
            category: ${category},
            startTime: "${startTime}",
            endTime: "${endTime}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.updateItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const updateTask = async (taskID, title, priority, estimatedTime, startDate, startTime) => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation UpdateTask {
        updateItem(
          username: "${user.username}",
          password: "${user.password}",
          task: {
            taskID: "${taskID}",
            title: "${title}",
            priority: ${priority},
            estimatedTime: ${estimatedTime},
            startTime: "${startDate}T${startTime}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.updateItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

// Remove API functions
export const removeCalendarItem = async calendarItemID => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation RemoveCalendarItem {
        removeItem(
          username: "${user.username}",
          password: "${user.password}",
          calendarItem: {
            calendarItemID: "${calendarItemID}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.removeItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const removeScheduleItem = async scheduleItemID => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation RemoveScheduleItem {
        removeItem(
          username: "${user.username}",
          password: "${user.password}",
          scheduleItem: {
            scheduleItemID: "${scheduleItemID}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.removeItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};

export const removeTask = async taskID => {
  let user = getCookie();
  opts.body = JSON.stringify({
    query: `
      mutation RemoveTask {
        removeItem(
          username: "${user.username}",
          password: "${user.password}",
          task: {
            taskID: "${taskID}"
          }
        )
      }
    `
  });

  try {
    let res = await fetch(url, opts);
    res = await res.json();
    if (res.errors) throw res.errors;
    else console.log(res.data.removeItem);
  } catch (err) {
    console.log("An error occured, please see below:");
    console.error(err);
  }
};
