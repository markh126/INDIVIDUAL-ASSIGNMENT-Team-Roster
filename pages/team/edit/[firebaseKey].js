import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleTeam } from '../../../api/teamsApi';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeams() {
  const [editTeam, setEditTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  return (
    <div><TeamForm obj={editTeam} /></div>
  );
}
