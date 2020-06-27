const getUserRepos = (user: string) => {
    let userRepo = `https://api.github.com/users/${user}/repos`
    fetch(userRepo)
        .then(res => res.json())
        .then(json => console.log(json))
}

getUserRepos('facebook')
