//Asynchronous
console.log('Before');
getUser(1, user => {
  getRepositories(user.gitHubUsername, repos => {
    getCommits(repo, commits => {});
  });
});
console.log('After');
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

// Synchronous
console.log('Before');
const user = getUser();
const repos = getRepositories(user.username);
const commits = getCommits(repos[0]);
console.log('After');
