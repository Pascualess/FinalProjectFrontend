import './Footer.css';

const Footer = () => {
return (
    <div className="Footer">
        <div className="top">
            <div>
                <h1>Trippin'</h1>
            </div>
            <div>
                <a href="/"><i className="fa-brands fa-facebook-square"></i></a>
                <a href="/"><i className="fa-brands fa-instagram-square"></i></a>
                <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                <a href="/"><i className="fa-brands fa-twitter-square"></i></a>
            </div>
        </div>

        <div className="bottom">
            <div>
                <h4>About</h4>
                <a href="/">About Us</a>
                <a href="/">Team</a>
                <a href="/">Careers</a>
            </div>
            <div>
                <h4>Help</h4>
                <a href="/">Support</a>
                <a href="/">Troubleshooting</a>
                <a href="/">Contact Us</a>
            </div>
            <div>
                <h4>Others</h4>
                <a href="/">Privacy Policy</a>
                <a href="/">Terms of Service</a>
                <a href="/">Copyright</a>
            </div>
        </div>
    </div>
)
}

export default Footer;