import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamsApi';

const initialState = {
  team_name: '',
  image: '',
};

export default function TeamForm({ obj }) {
  const [teamInput, setTeamInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setTeamInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(teamInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...teamInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team </h2>
      <FloatingLabel className="mb-3" label="Name" controlId="teamName">
        <Form.Control
          type="text"
          placeholder="Enter Team Name"
          name="team_name"
          value={teamInput.team_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Image" controlId="teamImage">
        <Form.Control
          type="url"
          placeholder="Enter Image Url"
          name="image"
          value={teamInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team
      </Button>

    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
