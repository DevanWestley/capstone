// app/api/my-projects/route.js
import { MOCK_PROJECTS, createProject } from "../../../lib/data2.js";
export async function GET(req) {
  try {
    // You can later add query parameters for filtering if needed
    return new Response(JSON.stringify(MOCK_PROJECTS), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
