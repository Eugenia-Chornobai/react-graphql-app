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
          {firstName} {lastName}
        </Card>
      )}
      <Link to={`/person/${id}`}>Show</Link>
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

export default PersonCard;
