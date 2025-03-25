"use client";

import { useState } from "react";
import { Container, TextInput, Button, Title, Paper, Text, Stack, Group, Divider, Image } from "@mantine/core";

type WeatherData = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    };
    temp_c: number;
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    is_day: number;
  };
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setError(null);
    setWeather(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unknown error");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather");
    }
  };

  return (
    <Container size="sm" pt="xl">
      <Title order={2} mb="md">
        Weather Forecast
      </Title>
      <Group>
        <TextInput
          placeholder="Enter city (e.g., Tokyo)"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button onClick={fetchWeather}>Search</Button>
      </Group>

      {error && (
        <Text mt="md" c="red">
          {error}
        </Text>
      )}

      {weather && (
        <Paper shadow="sm" p="md" mt="lg" withBorder>
          <Stack>
            <Group justify="space-between">
              <div>
                <Title order={3}>
                  {weather.location.name}, {weather.location.country}
                </Title>
                <Text size="sm" c="dimmed">
                  Local time: {weather.location.localtime}
                </Text>
              </div>
              <Image
                src={`https:${weather.current.condition.icon}`}
                alt={weather.current.condition.text}
                width={64}
                height={64}
              />
            </Group>

            <Divider />

            <Text>{weather.current.condition.text}</Text>
            <Text>Temperature: {weather.current.temp_c} °C</Text>
            <Text>Feels like: {weather.current.feelslike_c} °C</Text>
            <Text>Humidity: {weather.current.humidity} %</Text>
            <Text>Wind: {weather.current.wind_kph} km/h</Text>
          </Stack>
        </Paper>
      )}
    </Container>
  );
}
