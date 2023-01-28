/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getTeams } from '../api/teamsApi';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function Home() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);

  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <>
      <Head>
        <title>Team Page</title>
      </Head>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {teams.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
