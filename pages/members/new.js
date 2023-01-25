import React from 'react';
import Head from 'next/head';
import MemberForm from '../../components/forms/MemberForm';

export default function NewMember() {
  return (
    <>
      <Head>
        <title>New Team Member Form</title>
      </Head>
      <MemberForm />
    </>
  );
}
