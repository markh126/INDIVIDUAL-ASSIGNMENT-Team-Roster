import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleTeamMember } from '../../../api/teamMember';
import MemberForm from '../../../components/forms/MemberForm';

export default function EditTeamMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeamMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <MemberForm obj={editItem} />
  );
}
