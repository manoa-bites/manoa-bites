'use client';

import { Issue } from '@prisma/client';
import { Card } from 'react-bootstrap/';

const IssueCard = ({ issue }: { issue : Issue }) => (
  <main>
    <Card className="h-100 mb-3">
      <Card.Header>
        <Card.Title>
          Topic:
          {' '}
          {issue.topic}
        </Card.Title>
        <Card.Subtitle>
          Name:
          {' '}
          {issue.name || 'Anonymous'}
          Contact Info:
          {' '}
          {issue.contactinfo && ` (${issue.contactinfo})`}
          Description:
          {' '}
          {issue.description}
        </Card.Subtitle>
      </Card.Header>
      <Card.Footer>
        Date Reported:
        {' '}
        {issue.createdAt.toLocaleDateString('en-US')}
      </Card.Footer>
    </Card>
  </main>
);

export default IssueCard;
