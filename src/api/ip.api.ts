export async function getIp() {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) throw new Error(`IP API error:: ${response.status}`);
    return response.json();
}