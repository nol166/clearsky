const issueContainer = document.querySelector('#issue-container')
const limitWarning = document.querySelector('#limit-warning')
let repoName = document.querySelector('#repo-name')

const getRepoName = () => {
    let queryString = document.location.search
    let repoName = queryString.split('=')[1]
    repoName
        ? getRepoIssues(repoName)
        : document.location.replace('./index.html')
}

// get repo issues
const getRepoIssues = repo => {
    repoName.innerText = repo
    let issuesURL = `https://api.github.com/repos/${repo}/issues?direction=asc`
    console.log('issuesURL', issuesURL)
    fetch(issuesURL).then(res => {
        res.ok
            ? res
                  .json()
                  .then(json => {
                      displayIssues(json)
                      if (res.headers.get('Link')) {
                          displayWarning(repo)
                      }
                  })
                  .catch(err => alert(err))
            : document.location.replace('./index.html')
    })
}

// TODO: get rid of this
// getRepoIssues('facebook/react')

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

const displayWarning = repo => {
    let linkEl = document.createElement('a')
    linkEl.textContent = 'See More Issues on GitHub.com'
    linkEl.setAttribute('href', `https://github.com/${repo}`)
    limitWarning.appendChild(linkEl)
}

getRepoName()
