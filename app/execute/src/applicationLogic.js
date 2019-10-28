const url = "http://localhost:3000/graphql";

const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
};

const saveCookie = (username, password) => (document.cookie = "user=" + JSON.stringify({ username: username, password: password }));

const getCookie = () => (document.cookie ? JSON.parse(document.cookie.split("=")[1]) : null);

const removeCookie = () => (document.cookie = "user=nothing;expires=Thu, 01 Jan 1970 00:00:01 GMT"); // Set user expired

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

  let res = await fetch(url, opts);
  res = await res.json();
  try {
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

const getThisWeeksSchedule = async (startDate, endDate) => {
  let user = getCookie();
  if (!user) return null;
  opts.body = JSON.stringify({
    query: `
      query GetUserWeekData {
        getUserData(
          username: "${user.username}",
          password: "${user.password}"
          startDate: "${startDate}",
          endDate: "${endDate}
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

const getAllCalendarItems = async () => {
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

const getAllScheduleItems = async () => {
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

const getAllTasks = async () => {
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

const addCalendarItem = (title, startDate, startTime, endDate, endTime) => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.addItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const updateCalendarItem = (calendarItemID, title, startDate, startTime, endDate, endTime) => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.updateItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const removeCalendarItem = calendarItemID => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.removeItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const addScheduleItem = (title, category, startTime, endTime) => {
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
            startTime: ${startTime},
            endTime: ${endTime}
          }
        )
      }
    `
  });

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.addItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const updateScheduleItem = (scheduleItemID, title, category, startTime, endTime) => {
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
            startTime: ${startTime},
            endTime: ${endTime}
          }
        )
      }
    `
  });

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.updateItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const removeScheduleItem = scheduleItemID => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.removeItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const addTask = (title, priority, estimatedTime) => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.addItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const updateTask = (taskID, title, priority, estimatedTime, startDate, startTime) => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.updateItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};

const removeTask = taskID => {
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

  fetch(url, opts)
    .then(res => res.json())
    .then(res => {
      if (res.errors) throw res.errors;
      else console.log(res.data.removeItem);
    })
    .catch(err => {
      console.log("An error occured, please see below:");
      console.error(err);
    });
};
