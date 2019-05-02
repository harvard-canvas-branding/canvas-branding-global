var ACCOUNTS = [];
    var FETCH_OPTIONS = {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    };

function fetchCourse(course_id) {
    return fetch("/api/v1/courses/" + course_id, FETCH_OPTIONS).then(handleResponse);
}

function fetchAccount(account_id) {
    return fetch("/api/v1/accounts/" + account_id, FETCH_OPTIONS).then(handleResponse);
}

function fetchCourseAccount(course) {
    return fetchAccount(course.account_id);
}

function fetchAccountParents(account) {
    ACCOUNTS.push(account);
    if (account.parent_account_id) {
        return fetchAccount(account.parent_account_id).then(fetchAccountParents);
    }
    return ACCOUNTS;
}

function handleResponse(response) {
    if(response.ok) {
        return response.json();
    }
    throw new Error('API request ' + response.url + ' failed with status code ' + response.status);
}

function getAccountsPath(accounts) {
    return accounts.slice().reverse().map(function(account) {
        return account.name;
    }).join(" > ");
}

function annotatePage(text, style) {
    style = style || {};
    style.color = style.color || "#000";
    style.backgroundColor = style.backgroundColor || "#ddd";
    var span, el = document.getElementById("course_account_id");
    if (el) {
        span = document.createElement("span");
        span.style.display = "block";
        span.style.color = style.color;
        span.style.backgroundColor = style.backgroundColor;
        span.style.padding = ".5em";
        span.style.marginBottom = "1em";
        span.appendChild(document.createTextNode(text));
        el.parentNode.appendChild(span);
    }
    return el;
}

function displayAccounts(accounts) {
    var text = getAccountsPath(accounts);
    annotatePage("Account: " + text) || alert(text);
    return accounts;
}

function handleError(errorObject) {
    var errorText = "Error: " + errorObject.message;
    console.log(errorObject);
    annotatePage(errorText, {color: "#721c24", backgroundColor: "#f8d7da"}) || alert(errorText);
    return errorObject;
}

function fetchAccountInfo() {
    var match = window.location.pathname.match(/^\/courses\/(\d+)/);
    var course_id = (match ? match[1] : null);
    if (course_id) {
        fetchCourse(course_id)
            .then(fetchCourseAccount)
            .then(fetchAccountParents)
            .then(displayAccounts)
            .catch(handleError);
    } else {
        var msg = "Please run this on a Canvas Course Settings page.";
        console.log(msg);
    }
}

function initAddSchoolDetail() {
  var reCourseSettingsPage = /courses\/.+?\/settings/;
  var windowUrl = window.location.pathname;
  var onCourseSettingsPage = (windowUrl.search(reCourseSettingsPage) != -1);

  if (onCourseSettingsPage) {
    fetchAccountInfo();
  }
}

$(document).ready(initAddSchoolDetail);
