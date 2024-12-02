'use client';

import { Issue } from '@prisma/client';
import { Card } from 'react-bootstrap/';

const IssueCard = ({ issue }: { issue : Issue }) => (
  <main>
    <Card className="h-100 mb-3">
      <Card.Header>
        <Card.Title>
          Topic:
          {issue.topic}
        </Card.Title>
        <Card.Subtitle>
          {issue.name || 'Anonymous'}
          {issue.contactinfo && ` (${issue.contactinfo})`}
          {issue.description}
        </Card.Subtitle>
      </Card.Header>
      <Card.Footer>
        {issue.createdAt.toLocaleDateString('en-US')}
      </Card.Footer>
    </Card>
  </main>
);

export default IssueCard;
