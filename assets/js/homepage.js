const userFormEl = document.querySelector('#user-form')
const nameInputEl = document.querySelector('#username')
const repoContainerEl = document.querySelector('#repo-container')
const repoSearchTerm = document.querySelector('#repo-search-term')
const languageBtnsEl = document.querySelector('#language-buttons')

languageBtnsEl.click = cb => {
    this.addEventListener('click', cb)
}

// form submit handler
const handleFormSubmit = e => {
    e.preventDefault()
    let username = nameInputEl.value.trim() // get value from input

    if (username) {
        getUserRepos(username)
        nameInputEl.value = ''
    } else {
        alert('Please provide a username')
    }
}
// add lisener to the form
userFormEl.addEventListener('submit', handleFormSubmit)

// get user repos
const getUserRepos = user => {
    let userRepo = `https://api.github.com/users/${user}/repos`
    fetch(userRepo).then(res => {
        res.ok
            ? res
                  .json()
                  .then(json => displayRepos(json, user))
                  .catch(err => alert(err))
            : alert(`Error ${res.statusText}`)
    })
}

const displayRepos = (repos, term) => {
    if (repos.length <= 0) {
        repoContainerEl.textContent = 'No repositories found.'
        return
    }
    repoSearchTerm.textContent = term

    repos.forEach(repo => {
        let repoName = `${repo.owner.login}/${repo.name}`
        let repoEl = document.createElement('a')

        repoEl.classList =
            'list-item flex-row justify-space-between align-center'
        repoEl.setAttribute('href', `./single-repo.html?repo=${repoName}`)

        // create a span element to hold repository name
        let titleEl = document.createElement('span')
        titleEl.textContent = repoName

        // create a status element
        let statusEl = document.createElement('span')

        // check if current repo has issues or not
        statusEl.innerHTML =
            repo.open_issues_count > 0
                ? `<i class='fas fa-times status-icon icon-danger'></i>${repo.open_issues_count} issue(s)`
                : '<i class="fas fa-check-square status-icon icon-success"></i>'

        // append to container
        repoEl.appendChild(titleEl)
        repoEl.appendChild(statusEl)

        // append container to the dom
        repoContainerEl.appendChild(repoEl)
    })
}

const getFeaturedRepos = language => {
    let apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`
    fetch(apiUrl).then(res => {
        res.ok
            ? res.json().then(json => displayRepos(json.items, language))
            : alert(res.statusText)
    })
}

const buttonClickHandler = e => {
    let language = e.target.getAttribute('data-language')
    if (language) getFeaturedRepos(language)
    repoContainerEl.textContent = ''
}

languageBtnsEl.click(buttonClickHandler)
