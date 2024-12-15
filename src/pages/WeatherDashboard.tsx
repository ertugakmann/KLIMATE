import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { Corner } from "@radix-ui/react-scroll-area";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  console.log(weatherQuery.data);

  const handleRefresh = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  };

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error || locationQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (
    weatherQuery.isLoading ||
    forecastQuery.isLoading ||
    locationQuery.isLoading
  ) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          variant={"outline"}
          size={"icon"}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      {/* Current and Hourly weather */}

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemprature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
