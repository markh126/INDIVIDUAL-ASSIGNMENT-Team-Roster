import React from 'react';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div>
        <UserProfile />
      </div>
    </>
  );
}
