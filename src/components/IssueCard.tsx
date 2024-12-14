'use client';

import { Issue } from '@prisma/client';
import { Button, Card, ListGroup } from 'react-bootstrap/';
import { useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation
import { deleteIssue } from '@/lib/dbActions';

const IssueCard = ({ issue }: { issue: Issue }) => {
  const router = useRouter(); // Initialize the router

  const handleDelete = async () => {
    try {
      await deleteIssue({ id: issue.id });
      swal('Resolved', 'Issue successfully deleted', 'success', { timer: 2000 });

      // Redirect to the specified callback URL (home page in this case)
      setTimeout(() => {
        router.push('/'); // Redirect to the homepage (or any other path)
      }, 4000); // Wait for the success message to show before redirecting
    } catch (error) {
      swal('Error', 'Failed to delete the issue', 'error');
    }
  };

  return (
    <main>
      <Card className="h-100 mb-3">
        <Card.Header>
          <Card.Title>
            Topic:
            {' '}
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
          Date Reported:
          {' '}
          {new Date(issue.createdAt).toLocaleDateString('en-US')}
          <Button variant="primary" onClick={handleDelete} className="float-end">Resolve</Button>
        </Card.Footer>
      </Card>
    </main>
  );
};

export default IssueCard;
