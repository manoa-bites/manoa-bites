'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { deleteLocation } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type Props = {
  id: number;
  name: string;
};

const DeleteLocationForm: React.FC<Props> = ({ id, name }) => {
  const { status } = useSession(); // Destructure only `status`

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    window.location.href = '/auth/signin';
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteLocation({ id });
      swal('Deleted', 'Location successfully deleted', 'success', { timer: 2000 });
    } catch (error) {
      swal('Error', 'Failed to delete the restaurant', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-3">Delete Location</h4>
              <p className="text-center">
                Are you sure you want to delete the restaurant:
                <strong>{name}</strong>
                ?
              </p>
              <div className="d-flex justify-content-center pt-3">
                <Button variant="danger" onClick={handleDelete}>
                  Confirm Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteLocationForm;
