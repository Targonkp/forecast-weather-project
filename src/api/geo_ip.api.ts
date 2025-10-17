import { GeoData } from "@/interfaces/geodata";

export async function getGeoByIp(ip: string): Promise<GeoData> {
  const response = await fetch(`https://ipwho.is/${ip}`);
  if (!response.ok) throw new Error(`Geo API error:: ${response.status}`);
  return response.json();
}
