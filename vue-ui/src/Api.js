export async function getMessage() {
    const response = await fetch('http://localhost:3000/');
    return response.text();
}
