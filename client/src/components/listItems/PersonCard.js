import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { id, firstName, lastName } = props;
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          <h3>
            {firstName} {lastName}
          </h3>
          <div>
              <Link
                style={styles.link}
                to={`/person/${id}`}>Learn More</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "500px",
  },
  link: {
    display: "flex",
    textAlign: "left",
  }
});

export default PersonCard;
