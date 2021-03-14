import { config } from "./config";

export async function sendVideo(file) {
  try {
    const response = await fetch(config.api + "path", {
      method: "post",
      headers: {
        "Content-Type": "video/mp4",
      },
      body: file,
    });

    if (!response.ok) {
      console.log(response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
