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
    if (response.ok) return response.json();

    // if the request is unauthorized for an account API call, try to provide a useful fallback
    const accountInfo = getFallbackAccountInfo(response.url);
    if (accountInfo !== null) return accountInfo;

    // this is either not an account fetch error, or it's an unhandled account fetch error,
    // so raise it as we're not expecting it
    const msg = 'API request ' + response.url + ' failed with status code ' + response.status;
    throw new Error(msg);
}

function getFallbackAccountInfo(url) {
    const reAccountUrl = /\/api\/v1\/accounts\/(?<accountId>\d+)$/;
    const match = reAccountUrl.exec(url);
    const accountId = match?.groups?.accountId;

    if (!accountId) return null; // this is not an account API call

    /* This user does not have access to the account `accountId`,
        and will likely be unable to fetch any parent accounts,
        so simply show the root account `name`; without an `id`
        this node should be rendered as text, not a link, and
        without a `parent_account_id` there will be no more
        account API fetches after this one.
    */
    return {name: 'Harvard University'};
}

function getAccountsPath(accounts) {
    return accounts.slice().reverse().map(function(account) {
        return account.id ? '<a href="/accounts/'+account.id+'">'+account.name+'</a>' : account.name;
    }).join(" > ");
}

function annotatePage(text, style) {
    style = style || {};
    style.color = style.color || "#000";
    style.backgroundColor = style.backgroundColor || "#ddd";
    var div, el = document.getElementById("course_account_id");
    if (el) {
        div = document.createElement("div");
        div.style.display = "block";
        div.style.color = style.color;
        div.style.backgroundColor = style.backgroundColor;
        div.style.padding = ".5em";
        div.style.marginBottom = "1em";

        // if the #course_account_id element is a <span>, the user cannot
        // edit the course; in this case we need extra padding above the
        // new <div> to give it more visual room
        if (el.tagName === "SPAN") div.style.marginTop = "1em";

        div.innerHTML=text;
        el.parentNode.appendChild(div);

        // ensure that the row label is aligned with the top of the row (similar to
        // e.g. "Participation" row) not the default center (e.g. "SIS ID" row)
        el.closest(".form-row").style.alignItems = "flex-start";
    }
    return el;
}

function displayAccounts(accounts) {
    var text = getAccountsPath(accounts);
    annotatePage("Account: " + text) || alert(text);
    return accounts;
}

function handleError(errorObject) {
    console.log(errorObject);
    return errorObject;
}

function fetchAccountInfo() {
    const courseId = ENV['COURSE_ID'] || null;
    if (courseId) {
        fetchCourse(courseId)
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
