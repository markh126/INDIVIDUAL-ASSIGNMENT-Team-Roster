/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeams() {
  const [viewTeams, setViewTeams] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewTeamAndMembers = () => {
    viewTeamDetails(firebaseKey).then(setViewTeams);
  };

  useEffect(() => {
    viewTeamAndMembers();
  }, []);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={viewTeams.image} alt={viewTeams.team_name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h2>{viewTeams.team_name}
          </h2>
          <hr />
        </div>
        <div className="mb-3 d-flex flex-wrap">
          {viewTeams.members?.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={viewTeamAndMembers} />
          ))}
        </div>
      </div>
    </div>
  );
}
