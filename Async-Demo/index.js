console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

function getUser(id) {
  setTimeout(() => {
    console.log('Reading a user from database', id);
    return { id: id, gitHubUsername: 'mitul' };
  }, 2000);
}
