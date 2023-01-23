/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getTeamMembers } from '../api/teamMember';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

function Home() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);

  const getAllTheTeamMembers = () => {
    getTeamMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheTeamMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/team_member/new" passHref>
        <Button>Add A New Team Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheTeamMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
