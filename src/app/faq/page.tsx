import { Container, Image } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" className=" justify-content-center py-3">
      <Container className="d-flex justify-content-center align-items-center">
        <Image src="/FullLogo.png" alt="Manoa Bites" style={{ height: '300px', borderRadius: '50%' }} />
      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <h5>Find your favorite food spots on campus!</h5>
      </Container>
      <h3>About The Application</h3>
      <p>
        This application is made by UH Manoa ICS students for the UH Community to help users like you to
        find a place to eat on campus.
      </p>
      <h3>Directory</h3>
      <p>
        The directory page will show you all the food vendors on campus.
        You can search for a specific vendor or filter by location.
      </p>
      <h3>Map</h3>
      <p>
        The map tab will allow you to see all the food vendors on campus. It is an interactive map that
        you can move around and zoom in and out of to view the locations of the vendors.
      </p>
      <h3>How To Become A Vendor</h3>
      <p>
        On our
        {' '}
        <a href="https://forms.gle/BzFbBFjH5P7m48dK6">google form</a>
        , the 5th question will ask if you want to bcome a vendor.
        Submit your email in that section of the form and we can send you a unique signup key to become a vendor.
      </p>
      <h3>How to Report a Problem</h3>
      <p>
        You can report any issues with the website
        {' '}
        or any additional feedback through our
        {' '}
        <a href="https://forms.gle/BzFbBFjH5P7m48dK6">google form</a>
        .
      </p>
    </Container>
  </main>
);

export default Home;
