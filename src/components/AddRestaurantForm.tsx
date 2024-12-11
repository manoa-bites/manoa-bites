import { AddRestaurantSchema } from '@/lib/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, ChangeEvent } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

type Props = {
  currentUserId: number | null;
  locations: Location[];
  onAddRestaurant: (newRestaurant: {
    name: string;
    website?: string;
    phone?: string;
    hours?: string;
    description?: string;
    menuLink?: string;
    onlineOrderLink?: string;
    latitude?: number;
    longitude?: number;
    postedById: number;
    locationId?: number;
    image?: string;
  }) => void;
};

type Location = {
  id: number;
  name: string;
};

const AddRestaurantForm: React.FC<Props> = ({
  currentUserId,
  locations,
  onAddRestaurant,
}) => {
  const [base64, setBase64] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRestaurantSchema),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: {
    name: string;
    website?: string;
    phone?: string;
    hours?: string;
    description?: string;
    menuLink?: string;
    onlineOrderLink?: string;
    latitude?: number;
    longitude?: number;
    locationId?: number;
  }) => {
    const newRestaurant = {
      ...data,
      postedById: currentUserId!,
      image: base64,
    };
    onAddRestaurant(newRestaurant);
    swal('Success', 'Your restaurant has been added', 'success', { timer: 2000 });
    reset();
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Restaurant</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <select
                    {...register('locationId')}
                    className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                  >
                    <option value={-1}>No location selected</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.locationId?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input type="file" onChange={handleImageChange} className="form-control" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <input
                    type="text"
                    {...register('website')}
                    className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.website?.message}</div>
                </Form.Group>

                {/* Add other form fields similarly */}

                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRestaurantForm;
