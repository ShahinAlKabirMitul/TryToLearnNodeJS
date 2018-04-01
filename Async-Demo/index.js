console.log('Before');
getUser(1, getRepositories(user));

console.log('After');

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}
function getCommits(repo) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}
function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from database', id);
    callback({ id: id, gitHubUsername: 'mitul' });
  }, 2000);
}
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Reading a user repo from database', username);
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}
