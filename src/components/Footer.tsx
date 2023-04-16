type Props = {};
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = (props: Props) => {
  const year = new Date().getFullYear();
  return (
    <div className="flex gap-2 justify-center items-center p-2 dark:bg-gray-800 dark:text-white">
      <span>&copy;{year} Brandon Hazelton</span>
      <ul className="flex gap-2">
        <li>
          <Link
            to="https://github.com/hazeltonbw"
            target="_blank"
            aria-label="My Github profile"
          >
            <AiFillGithub size={32} title="My Github profile" />
          </Link>
        </li>
        <li>
          <Link
            to="https://www.linkedin.com/in/hazeltonbw/"
            target="_blank"
            aria-label="My LinkedIn profile"
          >
            <AiFillLinkedin size={32} title="My LinkedIn profile" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
