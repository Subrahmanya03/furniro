import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        <div>
          <h2 style={styles.logo}>Funiro.</h2>
          <p style={styles.text}>
            400 University Drive Suite 200 <br />
            Coral Gables, FL 33134 USA
          </p>
        </div>

        <div>
          <h4 style={styles.heading}>Links</h4>
          <p style={styles.link}>Home</p>
          <p style={styles.link}>Shop</p>
          <p style={styles.link}>About</p>
          <p style={styles.link}>Contact</p>
        </div>

        <div>
          <h4 style={styles.heading}>Help</h4>
          <p style={styles.link}>Payment Options</p>
          <p style={styles.link}>Returns</p>
          <p style={styles.link}>Privacy Policies</p>
        </div>

        <div>
          <h4 style={styles.heading}>Newsletter</h4>
          <div style={styles.subscribe}>
            <input
              type="email"
              placeholder="Enter Your Email Address"
              style={styles.input}
            />
            <button style={styles.button}>SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <hr style={styles.hr} />

      <p style={styles.bottom}>2025 funiro. All rights reserved</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '50px 80px',
    backgroundColor: '#fff',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
  },
  logo: {
    fontWeight: 'bold',
  },
  heading: {
    marginBottom: '10px',
  },
  text: {
    color: '#666',
    fontSize: '14px',
  },
  link: {
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    marginBottom: '6px',
  },
  subscribe: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    border: 'none',
    borderBottom: '1px solid black',
    outline: 'none',
    padding: '5px',
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  hr: {
    margin: '40px 0',
  },
  bottom: {
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default Footer;
