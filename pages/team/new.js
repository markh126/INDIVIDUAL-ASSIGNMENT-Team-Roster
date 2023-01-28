import Head from 'next/head';
import React from 'react';
import TeamForm from '../../components/forms/TeamForm';

export default function NewTeam() {
  return (
    <>
      <Head>
        <title>New Team Form</title>
      </Head>
      <TeamForm />
    </>
  );
}
