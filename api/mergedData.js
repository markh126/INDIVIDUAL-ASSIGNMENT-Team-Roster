import { getSingleTeamMember } from './teamMember';
import { getATeamsMembers, getSingleTeam } from './teamsApi';

const viewTeamMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTeamMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getATeamsMembers(teamFirebaseKey)])
    .then(([teamObject, teamMembersArray]) => {
      resolve({ ...teamObject, members: teamMembersArray });
    }).catch((error) => reject(error));
});

export { viewTeamMemberDetails, viewTeamDetails };
