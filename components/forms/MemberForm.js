import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeamMember, updateTeamMember } from '../../api/teamMember';

const initialState = {
  name: '',
  class: '',
  image: '',
  teamLeader: false,
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
        .then(() => router.push(`/members/${obj.firebaseKey}`));
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
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team Member</h2>
      <FloatingLabel className="mb-3" label="Name" controlId="memberName">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Class" controlId="memberClass">
        <Form.Control
          type="text"
          placeholder="Enter Class"
          name="class"
          value={formInput.class}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Image" controlId="memberImage">
        <Form.Control
          type="url"
          placeholder="Enter Image Url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="teamLeader"
        name="teamLeader"
        label="Team Leader"
        checked={formInput.teamLeader}
        onChange={(e) => {
          setFormImput((prevState) => ({
            ...prevState,
            teamLeader: e.target.checked,
          }));
        }}
      />

      <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team Member
      </Button>

    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    class: PropTypes.string,
    image: PropTypes.string,
    teamLeader: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
