import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req: any = context.req;
  return {
    props: { user: (req as Request).user },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Profile: NextPage<Props['props']> = (props) => {
  const { user } = props;

  return <h1>Profile {JSON.stringify(user)}</h1>;
};

export default Profile;
