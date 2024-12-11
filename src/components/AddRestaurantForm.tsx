'use client';

import { AddRestaurantSchema } from "@/lib/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Card, Form, FormGroup, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

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
  // Add any other fields as necessary
};

const AddRestaurantForm: React.FC<Props> = ({
  currentUserId,
  locations,
  onAddRestaurant,
}) => {
  const [base64, setBase64] = useState<string>("");

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
    swal("Success", "Your restaurant has been added", "success", {
      timer: 2000,
    });
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
                {/* Form fields here */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRestaurantForm;
