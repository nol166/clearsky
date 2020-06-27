// container for all issues
const issueContainer = document.querySelector('#issue-container')
let repoName = document.querySelector('#repo-name')

// get repo issues
const getRepoIssues = repo => {
    repoName.innerText = repo
    let issuesURL = `https://api.github.com/repos/${repo}/issues?direction=asc`
    fetch(issuesURL).then(res => {
        res.ok
            ? res
                  .json()
                  .then(json => displayIssues(json))
                  .catch(err => alert(err))
            : alert(`Error ${res.statusText}`)
    })
}

// TODO: get rid of this
getRepoIssues('microsoft/vscode')

const displayIssues = issues => {
    if (issues.length <= 0) {
        issueContainer.textContent = `Currently no issues in ${repoName}`
        return
    }

    issues.forEach(issue => {
        // link
        let issueEl = document.createElement('a')
        issueEl.classList =
            'list-item flex-row justify-space-between align-center'
        issueEl.setAttribute('href', issue.html_url)
        issueEl.setAttribute('target', '_blank')

        // issue title
        let titleEl = document.createElement('span')
        titleEl.textContent = issue.title
        issueEl.appendChild(titleEl)

        // type
        let typeEl = document.createElement('span')
        typeEl.textContent = issue.pull_request ? '(Pull request)' : '(Issue)'
        issueEl.appendChild(typeEl)

        // append
        issueContainer.appendChild(issueEl)
    })
}
