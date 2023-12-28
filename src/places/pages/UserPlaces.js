import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserPlaces() {
  const userId = useParams().userId;

  const [placeData, setPlaceData] = useState();

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}api/places/user/${userId}`
        );

        setPlaceData(responseData.places);
      } catch (err) {}
    };

    fetchPlace();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setPlaceData((prevPlace) =>
      prevPlace.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && placeData && (
        <PlaceList items={placeData} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
}

export default UserPlaces;
