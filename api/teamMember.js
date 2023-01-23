import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeamMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_members/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_members/${firebaseKey}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_members/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getTeamMembers,
  getSingleTeamMember,
  deleteTeamMember,
  createTeamMember,
};
