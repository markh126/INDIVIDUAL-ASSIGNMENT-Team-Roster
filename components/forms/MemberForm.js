import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeamMember, updateTeamMember } from '../../api/teamMember';

const initialState = {
  name: '',
  class: '',
  image: '',
  team_leader: false,
};

export default function MemberForm({ obj }) {
  const [formInput, setFormImput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormImput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormImput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeamMember(formInput)
        .then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeamMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeamMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="memberName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="memberClass">
        <Form.Label>Class</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Class"
          name="class"
          value={formInput.class}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="memberImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Image Url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="memberSwitch">
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="team_leader"
          name="team_leader"
          label="Team Leader"
          checked={formInput.team_leader}
          onChange={(e) => {
            setFormImput((prevState) => ({
              ...prevState,
              team_leader: e.target.checked,
            }));
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    class: PropTypes.string,
    image: PropTypes.string,
    team_leader: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
