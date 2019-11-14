const url = "http://localhost:3000/graphql";

const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

var userData;

const saveCookie = (username, password) =>
    document.cookie = "user=" + JSON.stringify({username: username, password: password});

const getCookie = () =>
    document.cookie ? JSON.parse(document.cookie.split('=')[1]) : null;

const removeCookie = () =>
    document.cookie = "user=nothing;expires=Thu, 01 Jan 1970 00:00:01 GMT"; // Set user expired

const login = (username, password) => {
    opts.body = JSON.stringify({ query: `
        query GetUserData {
            getUserData(
                username: "${username}",
                password: "${password}"
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.data.getUserData) {
            console.log("User " + username + " signed in");
            userData = res.data.getUserData;
            saveCookie(username, password);
        } else {
            console.log("Incorrect sign in details");
            removeCookie();
        }
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const logout = () => {
    userData = null;
    removeCookie();
}

window.onload = () => {
    let user = getCookie();
    if (user)
        login(user.username, user.password);
}

const getThisWeeksSchedule = async (startTime, endTime) => {
    let user = getCookie();
    if (!user)
        return null;
    opts.body = JSON.stringify({ query: `
        query GetUserWeekData {
            getUserData(
                username: "${user.username}",
                password: "${user.password}",
                startTime: "${startTime}",
                endTime: "${endTime}"
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
    `});

    try {
        let res = await fetch(url, opts);
        res = await res.json();
        if (res.errors)
            throw res.errors;
        return res.data.getUserData;
    }
    catch (err) {
        console.log("An error occured, please see below:");
        console.error(err);
    }
}

const getAvailableTime = async (startDate, endDate, estimatedTime) => {
    let user = getCookie();
    if (!user)
        return null;
    opts.body = JSON.stringify({ query: `
        query GetUserWeekData {
            getAvailableTime(
                username: "${user.username}",
                password: "${user.password}"
                startDate: "${startDate}",
                endDate: "${endDate}",
                esimatedTime: "${estimatedTime}"
            ) {
                availableTimes {
                    startTime
                    endTime
                }
            }
        }
    `});

    try {
        let res = await fetch(url, opts);
        res = await res.json();
        return res.data.getAvailableTime;
    }
    catch (err) {
        console.log("An error occured, please see below:");
        console.error(err);
    }
}

const getAllCalendarItems = () => userData.calendarItems;

const getAllScheduleItems = () => userData.scheduleItems;

const getAllTasks = () => userData.tasks;

const addCalendarItem = (title, startDate, startTime, endDate, endTime) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        userData.calendarItems.Re
        console.log(res.data.addItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const updateCalendarItem = (calendarItemID, title, startDate, startTime, endDate, endTime) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.updateItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const removeCalendarItem = (calendarItemID) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
        mutation RemoveCalendarItem {
            removeItem(
                username: "${user.username}",
                password: "${user.password}",
                calendarItem: {
                    calendarItemID: "${calendarItemID}"
                }
            )
        }
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.removeItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const addScheduleItem = (title, category, startTime, endTime) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.addItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const updateScheduleItem = (scheduleItemID, title, category, startTime, endTime) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.updateItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const removeScheduleItem = (scheduleItemID) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
        mutation RemoveScheduleItem {
            removeItem(
                username: "${user.username}",
                password: "${user.password}",
                scheduleItem: {
                    scheduleItemID: "${scheduleItemID}"
                }
            )
        }
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.removeItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const addTask = (title, priority, estimatedTime) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.addItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const updateTask = (taskID, title, priority, estimatedTime, startDate, startTime) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
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
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.updateItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}

const removeTask = (taskID) => {
    let user = getCookie();
    opts.body = JSON.stringify({ query: `
        mutation RemoveTask {
            removeItem(
                username: "${user.username}",
                password: "${user.password}",
                task: {
                    taskID: "${taskID}"
                }
            )
        }
    `});

    fetch(url, opts)
    .then(res => res.json())
    .then((res) => {
        if (res.errors)
            throw res.errors;
        else
            console.log(res.data.removeItem); 
    })
    .catch((err) => {
        console.log("An error occured, please see below:");
        console.error(err);
    });
}
