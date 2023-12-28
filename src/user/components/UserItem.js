import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import "./UserItem.css";
import Card from "../../shared/components/UIElements/Card";

function UserItem({ id, image, placeCount, name }) {
  return (
    <li id={id} className="user-item">
      <Card className={"user-item__content"}>
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_BACKEND_URL}${image}`}
              alt={name}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
