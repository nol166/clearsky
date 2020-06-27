// container for all issues
const issueContainer = document.querySelector('#issue-container')
const limitWarning = document.querySelector('#limit-warning')
const nextBtn = document.querySelector('#next')
const prevBtn = document.querySelector('#prev')
let repoName = document.querySelector('#repo-name')
let page = 1

// get repo issues
const getRepoIssues = repo => {
    repoName.innerText = repo
    let issuesURL = `https://api.github.com/repos/${repo}/issues?direction=asc&page=${page}`
    console.log('issuesURL', issuesURL)
    fetch(issuesURL).then(res => {
        res.ok
            ? res
                  .json()
                  .then(json => {
                      displayIssues(json)

                      if (res.headers.get('Link')) {
                          console.log('more than 30 issues')
                      }
                  })
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

const nextPage = () => {
    issueContainer.innerHTML = ''
    page++
    getRepoIssues(repoName.innerText)
    console.log('nextPage -> repoName', repoName)
}

nextBtn.addEventListener('click', nextPage)

const prevPage = () => {
    if (page <= 1) {
        return
    } else {
        issueContainer.innerHTML = ''
        page--
        getRepoIssues(repoName.innerText)
        console.log('prevPage -> repoName', repoName)
    }
}

prevBtn.addEventListener('click', prevPage)
