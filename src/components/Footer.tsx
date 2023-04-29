const Footer = () => {
    return (
        <footer className="text-center text-xs p-3 bottom-0 w-full mt-16">
            <hr className="mb-10"/>
            <p>
                &copy;{new Date().getFullYear()} random-abcs - All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;

