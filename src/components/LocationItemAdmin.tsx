import { editLocation } from '@/lib/dbActions';
import { EditLocationSchema } from '@/lib/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Location } from '@prisma/client';

const onSubmit = async (data: Location) => {
  await editLocation(data);
  swal('Success', 'Location updated', 'success', {
    timer: 2000,
  });
};

const LocationItemAdmin = ({ location }: { location: Location }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Location>({
    resolver: yupResolver(EditLocationSchema),
  });

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Add Location</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={location.id} />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    defaultValue={location.name}
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LocationItemAdmin;
