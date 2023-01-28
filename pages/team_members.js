/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getTeamMembers } from '../api/teamMember';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

function TeamMembers() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const getAllTheTeamMembers = () => {
    getTeamMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheTeamMembers();
  }, []);

  return (
    <>
      <Head>
        <title>Team Roster</title>
      </Head>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={handleSearch}
          value={searchInput}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <div className="text-center my-4">
        <Link href="/members/new" passHref>
          <Button>Add A New Team Member</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {members.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheTeamMembers} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TeamMembers;
