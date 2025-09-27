// src/js/ExternalServices.mjs
export const baseURL = import.meta.env.VITE_SERVER_URL;

export function buildImageUrl(path) {
  if (!path) return "../images/tents/tent.webp"; // fallback image
  return path.startsWith("http")
    ? path
    : `${baseURL}${path.replace(/^\/+/, "")}`;
}


async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {

    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }


  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }


  async checkout(orderData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };

    const response = await fetch(`${baseURL}checkout`, options);
    return await convertToJson(response);
  }
}
