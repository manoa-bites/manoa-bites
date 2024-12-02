'use client';

import { Issue } from '@prisma/client';
import { Card, ListGroup } from 'react-bootstrap/';

const IssueCard = ({ issue }: { issue : Issue }) => (
  <main>
    <Card className="h-100 mb-3">
      <Card.Header>
        <Card.Title>
          Topic:
          {issue.topic}
        </Card.Title>
        <Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Name:
              {' '}
              {issue.name || 'Anonymous'}
            </ListGroup.Item>
            <ListGroup.Item>
              Contact Info:
              {' '}
              {issue.contactinfo || 'Not Provided'}
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              {' '}
              {issue.description}
            </ListGroup.Item>
          </ListGroup>
        </Card.Subtitle>
      </Card.Header>
      <Card.Footer>
        {issue.createdAt.toLocaleDateString('en-US')}
      </Card.Footer>
    </Card>
  </main>
);

export default IssueCard;
