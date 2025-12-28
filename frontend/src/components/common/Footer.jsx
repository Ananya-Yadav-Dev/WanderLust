const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="f-info">
        <i className="fa-brands fa-square-facebook"></i>
        <i className="fa-brands fa-square-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>
      </div>
      <div className="f-company">&copy; Wanderlust Private Limited</div>
      <div className="f-info-links">
        <a href="/privacy">Privacy </a>•
        <a href="/terms">Terms</a>
      </div>
    </footer>
  );
};

export default Footer;
