import { useState, useEffect } from "react";

interface Coors {
    latitude: number;
    longitude: number;
}

const defaultCoords = [-23.55052, -46.633308];

export default function useGetLocation() {
    const [coords, setCoors] = useState<number[] | null>();

    useEffect(() => {
        function onSuccess(position: GeolocationPosition) {
            setCoors([position.coords.latitude, position.coords.longitude]);
        }
        function onError() {
            setCoors(defaultCoords);
        }
        try {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } catch (error) {
            setCoors(defaultCoords);
            console.log(error);
        }

    }, []);
    return { coords: coords };
}