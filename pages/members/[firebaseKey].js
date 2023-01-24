/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeamMember } from '../../api/teamMember';

export default function ViewTeamMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeamMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={memberDetails.image} alt={memberDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h2>{memberDetails.name}
            {memberDetails.team_leader ? ' 🤍' : ''}
          </h2>
          <hr />
        </div>
      </div>
    </div>
  );
}
